import { Injectable } from '@nestjs/common';
import { PrismaClient, ChatMessageTypes } from '@prisma/client';
import { MessageDto } from './dto/message.dto';

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
				marked_as: 'Unread',
				note: '',
				is_muted: false,
				is_blocked: false,
			},
		});

		console.log(conv);

		return conv.id;
	}

	async findUniqueConversation(conversation_id: number) {
		const conv = await this.prisma.chat_conversation.findUnique({
			where: {
				id: conversation_id,
			},
		});
		console.log(conv);
		return conv;
	}

	async findAllConversation(uid: number) {
		const conv = await this.prisma
			.$queryRaw`SELECT chat_conversation.id AS id, chat_conversation.customer_id AS customer_id, chat_conversation.shop_id AS shop_id, marked_as, note, is_muted, is_blocked, firstname, lastname, cpf.path AS customer_pic, shop_name, sp.path AS shop_pic, content_type, seen, COALESCE(text) AS text
FROM chat_conversation
    JOIN customer_info ci on chat_conversation.customer_id = ci.customer_id
    LEFT JOIN customer_picture cp on ci.customer_id = cp.customer_id
    JOIN customer_picture_file cpf on cp.picture_id = cpf.id
    JOIN shop_info si on chat_conversation.shop_id = si.id
    LEFT JOIN shop_picture sp on si.id = sp.shop_id
    JOIN chat_message cm on chat_conversation.id = cm.conversation_id
    LEFT JOIN chat_text on cm.id = chat_text.message_id
WHERE chat_conversation.customer_id = 2
   OR si.customer_id = 2
ORDER BY message_time DESC LIMIT 1;`;

		console.log(conv);

		return conv;
	}

	async findAllMessage(conversation_id: number) {
		const message = await this.prisma
			.$queryRaw`SELECT * FROM chat_message JOIN chat_text ON chat_message.id = chat_text.message_id WHERE chat_message.conversation_id = ${conversation_id}`;

		console.log(message);

		return message;
	}

	async createMessage(message: MessageDto) {
		const msg = await this.prisma.chat_message.create({
			data: {
				conversation_id: message.conversation_id,
				from_customer: message.from_customer /** this one should  */,
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
		}

		console.log(msg);
		console.log(msgContent);

		delete msg.id;

		return {
			...msg,
			...msgContent,
		};
	}

  async updateMessageToSeen(message_id: number) {
    await this.prisma.chat_message.update({
      where: {
        id: message_id
      },
      data: {
        seen: true
      }
    })
  }
}
