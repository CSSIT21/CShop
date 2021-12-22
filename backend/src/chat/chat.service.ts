import { Injectable } from '@nestjs/common';
import { PrismaClient, ChatMessageTypes, ChatConversationMark } from '@prisma/client';
import { MessageDto } from './dto/message.dto';
import { NotificationDto } from './dto/notification.dto';
import { io } from 'socket.io-client';

@Injectable()
export class ChatService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async createConversation(uid: number, shop_id: number) {
		const conv = await this.prisma.chat_conversation.create({
			data: {
				customer_id: uid,
				shop_id: shop_id,
				marked_as: 'None',
				note: '',
				is_muted: false,
				is_blocked: false,
			},
		});

		// console.log(conv);

		return conv.id;
	}

	async findUniqueConversation(conversation_id: number) {
		const conv = await this.prisma.chat_conversation.findUnique({
			where: {
				id: conversation_id,
			},
		});
		// console.log(conv);
		return conv;
	}

	async findUniqueConversationId(uid: number, shop_id: number) {
		const conv: { id: number }[] = await this.prisma
			.$queryRaw`SELECT id FROM chat_conversation WHERE customer_id = ${uid} AND shop_id = ${shop_id};`;
		// console.log(conv);
		const conv_id = conv.length > 0 ? conv[0].id : -1;
		if (conv_id === -1) {
			const newConv_id = await this.createConversation(uid, shop_id);
			await this.createMessage({
				conversation_id: newConv_id,
				content_type: 'Text',
				content: 'Welcome to our shop',
				from_customer: false,
			});
			return newConv_id;
		} else {
			const msg = await this.prisma
				.$queryRaw`SELECT COUNT(*) FROM chat_message cm JOIN chat_conversation cc on cc.id = cm.conversation_id
WHERE cc.id = ${conv_id} AND cm.content_type <> 'Noti';`;
			if (msg[0].count === 0) {
				await this.createMessage({
					conversation_id: conv_id,
					content_type: 'Text',
					content: 'Welcome to our shop',
					from_customer: false,
				});
			}
		}
		return conv_id;
	}

	async findAllConversation(uid: number) {
		const conv = await this.prisma
			.$queryRaw`WITH cmax(id, time) AS (SELECT conversation_id, max(message_time) FROM chat_message WHERE content_type <> 'Noti' GROUP BY conversation_id)
SELECT chat_conversation.id AS id, chat_conversation.customer_id AS customer_id, chat_conversation.shop_id AS shop_id, marked_as, note, is_muted, is_blocked, firstname, lastname, cpf.path AS customer_pic, shop_name, sp.path AS shop_pic, content_type, seen, COALESCE(text) AS latest_text, chat_message.id AS latest_id, from_customer
FROM cmax
    JOIN chat_message ON cmax.time = chat_message.message_time
    JOIN chat_conversation ON chat_message.conversation_id = chat_conversation.id
    LEFT JOIN customer_info ci on chat_conversation.customer_id = ci.customer_id
    LEFT JOIN customer_picture cp on ci.customer_id = cp.customer_id
    LEFT JOIN customer_picture_file cpf on cp.picture_id = cpf.id
    LEFT JOIN shop_info si on chat_conversation.shop_id = si.id
    LEFT JOIN shop_picture sp on si.id = sp.shop_id
    LEFT JOIN chat_text ct on chat_message.id = ct.message_id
WHERE chat_conversation.customer_id = ${uid} OR si.customer_id = ${uid}
ORDER BY message_time DESC;`;

		// console.log(conv);

		return conv;
	}

	async findAllMessage(conversation_id: number) {
		const message = await this.prisma
			.$queryRaw`WITH msg(id, conversation_id, from_customer, message_time, content_type, seen, content, content_extra) AS
         (SELECT id,
                 conversation_id,
                 from_customer,
                 message_time,
                 content_type,
                 seen,
                 path      as content,
                 thumbnail as content_extra
          FROM chat_message
                   JOIN chat_video ON chat_message.id = chat_video.message_id
          UNION
          SELECT id,
                 conversation_id,
                 from_customer,
                 message_time,
                 content_type,
                 seen,
                 text as content,
                 NULL
          FROM chat_message
                   JOIN chat_text ON chat_message.id = chat_text.message_id
          UNION
          SELECT id,
                 conversation_id,
                 from_customer,
                 message_time,
                 content_type,
                 seen,
                 path as content,
                 NULL
          FROM chat_message
                   JOIN chat_image ON chat_message.id = chat_image.message_id)
SELECT *
FROM msg
WHERE conversation_id = ${conversation_id}
ORDER BY message_time;`;

		// console.log(message);

		return message;
	}

	async findLatestMessageId(uid: number) {
		const message: { id: number }[] = await this.prisma.$queryRaw`SELECT chat_message.id
FROM chat_message
    JOIN chat_conversation cc on chat_message.conversation_id = cc.id
    JOIN shop_info si on cc.shop_id = si.id
WHERE cc.customer_id = ${uid} OR si.customer_id = ${uid}
ORDER BY message_time DESC LIMIT 1;`;

		return message.length === 1 ? message[0].id : 0;
	}

	async findAllNotification(uid: number) {
		const noti = await this.prisma
			.$queryRaw`SELECT cm.id AS id, seen, action_url, notification_text, message_time, cc.id AS conversation_id, shop_name
FROM chat_notification
    JOIN chat_message cm on chat_notification.message_id = cm.id
    JOIN chat_conversation cc on cc.id = cm.conversation_id
    JOIN shop_info si on cc.shop_id = si.id
WHERE cc.customer_id = ${uid}
ORDER BY message_time DESC;`;
		return noti;
	}

	async createNotification(notification: NotificationDto) {
		// console.log('gonna push ', notification);
		const conv: { id: number }[] = await this.prisma
			.$queryRaw`SELECT id FROM chat_conversation WHERE customer_id = ${notification.customer_id} AND shop_id = ${notification.shop_id};`;
		// if(conv.length === 0) conv = await this.createConversation(notification.customer_id, notification.shop_id)
		const conv_id =
			conv.length > 0
				? conv[0].id
				: await this.createConversation(notification.customer_id, notification.shop_id);

		const msg = await this.prisma.chat_message.create({
			data: {
				conversation_id: conv_id,
				from_customer: false,
				content_type: 'Noti',
				seen: false,
			},
		});
		const msgContent = await this.prisma.chat_notification.create({
			data: {
				message_id: msg.id,
				action_url: notification.action_url,
				notification_text: notification.notification_text.substring(0, 100),
				type: 'Text',
			},
		});
		const shop = await this.prisma
			.$queryRaw`SELECT shop_name FROM chat_conversation JOIN shop_info si on chat_conversation.shop_id = si.id WHERE chat_conversation.id = ${conv_id};`;

		return {
			id: msg.id,
			seen: msg.seen,
			action_url: msgContent.action_url,
			notification_text: msgContent.notification_text,
			message_time: msg.message_time,
			conversation_id: conv_id,
			shop_name: shop[0].shop_name,
		};
	}

	async createMessage(message: MessageDto) {
		const msg = await this.prisma.chat_message.create({
			data: {
				conversation_id: message.conversation_id,
				from_customer: message.from_customer /** this one should come from server-side */,
				content_type: message.content_type,
				seen: false,
			},
		});
		let msgContent;

		switch (message.content_type) {
			case 'Text':
				msgContent = await this.prisma.chat_text.create({
					data: {
						message_id: msg.id,
						text: message.content,
					},
				});
				break;

			case 'Image':
				msgContent = await this.prisma.chat_image.create({
					data: {
						message_id: msg.id,
						title: '',
						path: message.content,
						thumbnail: '',
					},
				});
				break;

			case 'Video':
				msgContent = await this.prisma.chat_video.create({
					data: {
						message_id: msg.id,
						title: '',
						path: message.content,
						thumbnail: message.content_extra,
					},
				});
				break;
		}

		// console.log(msg);

		delete msgContent.message_id;

		return {
			...msg,
			content: msgContent.text || msgContent.path,
			content_extra: msgContent.thumbnail || null,
			temp_id: message.temp_id,
		};
	}

	async updateMessageToSeen(message_id: number) {
		await this.prisma.chat_message.update({
			where: {
				id: message_id,
			},
			data: {
				seen: true,
			},
		});
	}

	async findShop(uid: number) {
		return await this.prisma.$queryRaw`SELECT shop_name, path AS shop_pic
FROM customer_info
    JOIN shop_info ON shop_info.customer_id = customer_info.customer_id
    LEFT JOIN shop_picture sp on shop_info.id = sp.shop_id
WHERE customer_info.customer_id = ${uid}`;
	}

	async updateMark(conversation_id: number, value: ChatConversationMark) {
		await this.prisma.$queryRaw`UPDATE chat_conversation SET marked_as = ${value} WHERE id = ${conversation_id};`;
	}

	async updateGreet(conversation_id: number, value: ChatConversationMark) {
		// await this.prisma.$queryRaw`UPDATE chat_conversation SET marked_as = ${value} WHERE id = ${conversation_id};`;
	}

	async deleteMessage(message_id: number) {
		await this.prisma.$queryRaw`DELETE FROM chat_text WHERE message_id = ${message_id}`
		await this.prisma.$queryRaw`DELETE FROM chat_image WHERE message_id = ${message_id}`;
		await this.prisma.$queryRaw`DELETE FROM chat_video WHERE message_id = ${message_id}`;
		await this.prisma.$queryRaw`DELETE FROM chat_message WHERE id = ${message_id}`;
	}

	static push(notification: { from: number; to: number; text: string; redirect_to: string }) {
		//   console.log('gonna push ', notification)
		const SOCKET_PORT = parseInt(process.env.SERVER_PORT) + 1;
		const socket = io('ws://0.0.0.0:' + SOCKET_PORT);
		socket.emit('push', {
			shop_id: notification.from,
			customer_id: notification.to,
			notification_text: notification.text,
			action_url: notification.redirect_to,
		});
	}
}
