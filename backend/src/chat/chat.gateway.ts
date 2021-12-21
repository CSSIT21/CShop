import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { ConversationDto } from './dto/conversation.dto';
import { NotificationDto } from './dto/notification.dto';

const SOCKET_PORT = parseInt(process.env.SERVER_PORT) + 1;

@WebSocketGateway(SOCKET_PORT, { cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private connectionMap: Map<number, { customer: string; shop: string }>;

	constructor(private readonly chatService: ChatService) {
		this.connectionMap = new Map();
	}

	@WebSocketServer()
	server: Server;

	async handleConnection(client: any, ...args: any[]) {}

	async handleDisconnect(client: any) {
		for (let [conversation, token] of this.connectionMap.entries()) {
			if (token.customer === client.id) {
				this.connectionMap.get(conversation).customer = null;
				this.server.to(conversation.toString()).emit('status', {
					event: 'left',
					peer: 'customer',
					conversation_id: conversation,
				});
			} else if (token.shop === client.id) {
				this.connectionMap.get(conversation).shop = null;
				this.server.to(conversation.toString()).emit('status', {
					event: 'left',
					peer: 'shop',
					conversation_id: conversation,
				});
			}

			if (
				this.connectionMap.get(conversation) &&
				Object.values(this.connectionMap.get(conversation)).every((t) => t === null)
			) {
				this.connectionMap.delete(conversation);
			}
		}
	}

	@SubscribeMessage('get')
	async get(@MessageBody() data: { item: string; as: number; with?: any }, @ConnectedSocket() client: Socket) {
		console.log('/chat get', data);
		// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
		switch (data.item) {
			case 'conversation': {
				/** should not send shop-side info to customer but, well, not really our concern here **/
				if (data.with) {
					return await this.getConversation(client, data.with.conversation_id);
				} else {
					return await this.getAllConversation(client, data.as);
				}
				break;
			}

			case 'conversationId': {
				return await this.getConversationId(client, data.as, data.with);
			}

			case 'message': {
				if (data.with) {
					return await this.getAllMessage(client, data.with.conversation_id);
				} else {
					//
				}
				break;
			}

			case 'latestMessageId': {
				return await this.getLatestMessageId(client, data.as);
				break;
			}

			case 'notification': {
				return await this.getNotification(client, data.as);
				break;
			}

			case 'shop': {
				return await this.getShop(client, data.as);
				break;
			}
		}
	}

	async getConversation(@ConnectedSocket() client: Socket, conversation_id: number) {
		/** should verify that client is authorized for that conversation **/
		const conv = await this.chatService.findUniqueConversation(conversation_id);
		return {
			event: 'get',
			data: {
				item: 'conversation',
				data: conv,
			},
		};
	}

	async getAllConversation(@ConnectedSocket() client: Socket, uid: number) {
		/** uid should come from server-side state management, but let's make it simple  **/

		// const uid = await AuthenticationService.getUserFromToken(client.handshake.headers.cookie);
		// console.log(uid);
		const conv = await this.chatService.findAllConversation(uid);
		return {
			event: 'get',
			data: {
				item: 'conversation',
				data: conv,
			},
		};
	}

	async getConversationId(@ConnectedSocket() client: Socket, uid: number, shop_id: number) {
		const conv_id = await this.chatService.findUniqueConversationId(uid, shop_id);
		return {
			event: 'get',
			data: {
				item: 'conversationId',
				data: conv_id,
			},
		};
	}

	async getAllMessage(@ConnectedSocket() client: Socket, conversation_id: number) {
		/** should verify that client is authorized for that message **/
		const message = await this.chatService.findAllMessage(conversation_id);
		return {
			event: 'get',
			data: {
				item: 'message',
				data: {
					conversation_id: conversation_id,
					messages: message,
				},
			},
		};
	}

	async getLatestMessageId(@ConnectedSocket() client: Socket, uid: number) {
		const message_id = await this.chatService.findLatestMessageId(uid);
		return {
			event: 'get',
			data: {
				item: 'latestMessageId',
				data: {
					id: message_id,
				},
			},
		};
	}

	async getNotification(@ConnectedSocket() client: Socket, uid: number) {
		const noti = await this.chatService.findAllNotification(uid);
		// console.log(noti);
		return {
			event: 'get',
			data: {
				item: 'notification',
				data: noti,
			},
		};
	}

	async getShop(@ConnectedSocket() client: Socket, uid: number) {
		const shop = await this.chatService.findShop(uid);
		return {
			event: 'get',
			data: {
				item: 'shop',
				data: shop
			}
		}
	}

	@SubscribeMessage('join')
	async join(@MessageBody() data: ConversationDto, @ConnectedSocket() client: Socket) {
		/** should first check if the user is authorized for that conversation **/
		client.join(data.conversation_id.toString());

		/** Damn, let's make it simple by trusting the client **/

		// /***
		//  * Query DB to find out whether this client is customer or shop, then save in connectionMap
		//  */
		// if (!this.connectionMap.has(data.conversation_id)) {
		// 	/** uid should come from server-side state management, but let's make it simple  **/
		// 	// const uid = await AuthenticationService.getUserFromToken(client.handshake.headers.cookie);
		// 	const conv = await this.chatService.findUniqueConversation(data.conversation_id);
		// 	const token = {
		// 		customer: conv.customer_id === uid ? client.id : null,
		// 		shop: conv.shop_id === uid ? client.id : null,
		// 	};
		// 	this.connectionMap.set(data.conversation_id, token);
		// } else {
		// 	const conn = this.connectionMap.get(data.conversation_id);
		// 	if (conn.customer === null) {
		// 		conn.customer = client.id;
		// 	} else if (conn.shop === null) {
		// 		conn.shop = client.id;
		// 	}
		// }
		if (!this.connectionMap.has(data.conversation_id)) {
			const token = {
				customer: data.from_customer ? client.id : null,
				shop: !data.from_customer ? client.id : null,
			};
			this.connectionMap.set(data.conversation_id, token);
		} else {
			const conn = this.connectionMap.get(data.conversation_id);
			if (data.from_customer) {
				conn.customer = client.id;
			} else {
				conn.shop = client.id;
			}
		}
		const isCustomer = this.connectionMap.get(data.conversation_id).customer === client.id;
		this.server.to(data.conversation_id.toString()).emit('status', {
			event: 'join',
			peer: isCustomer ? 'customer' : 'shop',
			conversation_id: data.conversation_id,
		});
		// console.log(this.connectionMap.get(data.conversation_id));
		if (Object.values(this.connectionMap.get(data.conversation_id)).every((t) => t !== null)) {
			this.server.to(data.conversation_id.toString()).emit('status', {
				event: 'join',
				peer: isCustomer ? 'shop' : 'customer',
				conversation_id: data.conversation_id,
			});
		}
	}

	@SubscribeMessage('new-conversation')
	async newConversation(@MessageBody() data: ConversationDto, @ConnectedSocket() client: Socket) {
		const conv_id = await this.chatService.createConversation(data.uid, data.shop_id);

		return {
			event: 'new-conversation',
			data: conv_id,
		};
	}

	@SubscribeMessage('send')
	async send(@MessageBody() data: MessageDto) {
		const message = await this.chatService.createMessage(data);
		this.server.to(data.conversation_id.toString()).emit('send', message);
		// return {
		//   event: 'status',
		//   data: `sent ${data.message_content} to ${data.to}`
		// }
	}

	@SubscribeMessage('read')
	async read(@MessageBody() data: { conversation_id: number; message_id: number }) {
		await this.chatService.updateMessageToSeen(data.message_id);
		this.server.to(data.conversation_id.toString()).emit('read', data);
	}

	@SubscribeMessage('hello')
	hello(@MessageBody() data: { uid: number }, @ConnectedSocket() client: Socket) {
		client.join('user' + data.uid);
		// console.log('user ' + data.uid + ' joined');
	}

	@SubscribeMessage('push')
	async push(@MessageBody() data: NotificationDto) {
		const noti = await this.chatService.createNotification(data);
		this.server.to('user' + data.customer_id).emit('push', noti);
	}

	// @SubscribeMessage('createChat')
	// create(@MessageBody() createChatDto: CreateChatDto) {
	//   return this.chatService.create(createChatDto);
	// }

	// @SubscribeMessage('findAllChat')
	// findAll() {
	//   return this.chatService.findAll();
	// }

	// @SubscribeMessage('findOneChat')
	// findOne(@MessageBody() id: number) {
	//   return this.chatService.findOne(id);
	// }

	// @SubscribeMessage('updateChat')
	// update(@MessageBody() updateChatDto: UpdateChatDto) {
	//   return this.chatService.update(updateChatDto.id, updateChatDto);
	// }

	// @SubscribeMessage('removeChat')
	// remove(@MessageBody() id: number) {
	//   return this.chatService.remove(id);
	// }
}
