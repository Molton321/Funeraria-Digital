import { Coffin } from "../coffin/coffin.model";
import { Driver } from "../driver/driver.model";

export class Displacement {
    id?: number;
    displacement_date: Date;
    displacement_id_airport: number;
    displacement_name_airport: string;
    driver_id: number;
    coffin_id: number;
    driver?: Driver;
    coffin?: Coffin;
}
