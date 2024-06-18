import { UserChat } from "../user-chat/user-chat.model";

export class Message {
    id?: number;
    message_date: Date;
    message_text: string;
    user_chat_id: number;
    userChat?: UserChat;
}
