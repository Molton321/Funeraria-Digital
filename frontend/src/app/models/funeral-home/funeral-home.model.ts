import { City } from "../city/city.model";
import { Room } from "../room/room.model";

export class FuneralHome {
    id?: number;
    funeral_home_name: string;
    funeral_home_state: boolean;
    city_id: string;
    rooms?: Room[];
}
