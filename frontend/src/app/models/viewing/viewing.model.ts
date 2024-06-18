import { Chat } from "../chat/chat.model";
import { Room } from "../room/room.model";
import { Service } from "../service/service.model";

export class Viewing {
    id?: number;
    viewing_entry_date: Date;
    viewing_exit_date: Date;
    service_id: number;
    room_id: number;
    service?: Service;
    room?: Room;
    chat?: Chat;
}
