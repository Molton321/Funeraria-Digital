import { UserChat } from "../user-chat/user-chat.model";
import { Viewing } from "../viewing/viewing.model";

export class Chat {
    id?:number;
    chat_date: Date;
    chat_state: boolean;
    viewing_id: number;
    viewing?: Viewing;
    userChats?: UserChat[];
}
