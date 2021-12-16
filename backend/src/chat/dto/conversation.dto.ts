export class ConversationDto {
	conversation_id: number;
	customer_id?: number;
	shop_id?: number;
	marked_as?: string;
	note?: string;
	is_muted?: boolean;
	is_blocked?: boolean;
}
