import { Service } from "../service/service.model";

export class Burial {
    id?:number;
    burial_date: Date;
    burial_location: string;
    service_id: number;
    service?: Service;
}
