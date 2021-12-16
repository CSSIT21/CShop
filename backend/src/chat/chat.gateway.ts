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
import { AuthenticationService } from '../authentication/auth.service';

@WebSocketGateway(8081)
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
			if (token.customer === client.id || token.shop === client.id) {
				this.connectionMap.delete(conversation);
				const isCustomer = token.customer === client.id;
				this.server.to(conversation.toString()).emit('status', {
					event: 'left',
					peer: isCustomer ? 'customer' : 'shop',
				});
			}
		}
	}

	@SubscribeMessage('test')
	test(@MessageBody() data: { message: string }) {
		return {
			event: 'test',
			data: data.message + ' okay',
		};
	}

	@SubscribeMessage('get')
	async get(@MessageBody() data: { item: string; with?: any }, @ConnectedSocket() client: Socket) {
		switch (data.item) {
			case 'conversation': {
				/** should not send shop-side info to customer but, well, not really our concern here **/
				if (data.with) {
					return await this.getConversation(client, data.with.conversation_id);
				} else {
					return await this.getAllConversation(client);
				}
				break;
			}

			case 'message': {
				if (data.with) {
					return await this.getAllMessage(client, data.with.conversation_id);
				} else {
					//
				}
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

	async getAllConversation(@ConnectedSocket() client: Socket) {
		const uid = await AuthenticationService.getUserFromToken(client.handshake.headers.cookie);
		console.log(uid);
		const conv = await this.chatService.findAllConversation(uid);
		return {
			event: 'get',
			data: {
				item: 'conversation',
				data: conv,
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
				data: message,
			},
		};
	}

	@SubscribeMessage('join')
	async join(@MessageBody() data: ConversationDto, @ConnectedSocket() client: Socket) {
		/** should first check if the user is authorized for that conversation **/
		client.join(data.conversation_id.toString());
		/***
		 * Query DB to find out whether this client is customer or shop, then save in connectionMap
		 */
		if (!this.connectionMap.has(data.conversation_id)) {
			const uid = await AuthenticationService.getUserFromToken(client.handshake.headers.cookie);
			const conv = await this.chatService.findUniqueConversation(data.conversation_id);
			const token = {
				customer: conv.customer_id === uid ? client.id : null,
				shop: conv.shop_id === uid ? client.id : null,
			};
			this.connectionMap.set(data.conversation_id, token);
		} else {
			const conn = this.connectionMap.get(data.conversation_id);
			if (conn.customer === null) {
				conn.customer = client.id;
			} else if (conn.shop === null) {
				conn.shop = client.id;
			}
		}
		const isCustomer = this.connectionMap.get(data.conversation_id).customer === client.id;
		this.server
			.to(data.conversation_id.toString())
			.emit('status', {
        event: 'join',
        peer: isCustomer ? 'customer' : 'shop'
      });
	}

	@SubscribeMessage('new-conversation')
	async newConversation(@MessageBody() data: ConversationDto, @ConnectedSocket() client: Socket) {
		const uid = await AuthenticationService.getUserFromToken(client.handshake.headers.cookie);
		const conv_id = await this.chatService.createConversation(uid, data.shop_id);

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
  async read(@MessageBody() data: { conversation_id: number, message_id: number }) {
    await this.chatService.updateMessageToSeen(data.message_id)
    this.server.to(data.conversation_id.toString()).emit('read', data)
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
