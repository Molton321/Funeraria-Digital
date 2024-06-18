import { FuneralHome } from "../funeral-home/funeral-home.model";
import { Viewing } from "../viewing/viewing.model";

export class Room {
    id?: number;
    room_name: string;
    room_capacity: number;
    room_state: boolean;
    funeral_home_id: number;
    funeralHome?: FuneralHome;
    viewings?: Viewing[];
}
