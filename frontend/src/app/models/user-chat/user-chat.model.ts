import { Chat } from "../chat/chat.model";
import { Message } from "../message/message.model";

export class UserChat {
    id?: number;
    user_chat_state: boolean;
    user_id: string;
    chat_id: number;
    chat?: Chat;
    messages?: Message[];
}
