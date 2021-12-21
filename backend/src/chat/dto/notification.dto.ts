import { ChatMessageTypes } from '@prisma/client';

export class NotificationDto {
	conversation_id?: number;
	message_id?: number;
	content_type?: ChatMessageTypes;
	customer_id: number;
	shop_id: number;
	action_url: string;
	notification_text: string;
	message_time?: any;
	shop_name?: string;
	temp_id?: string;
}
