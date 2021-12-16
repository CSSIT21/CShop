import { ChatMessageTypes } from '@prisma/client';

export class MessageDto {
	conversation_id: number;
	message_id?: number;
	from_customer?: boolean;
	content_type: ChatMessageTypes;
	content: any;
}
