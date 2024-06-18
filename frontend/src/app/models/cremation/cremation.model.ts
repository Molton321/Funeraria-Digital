import { Service } from "../service/service.model";

export class Cremation {
    id?: number;
    cremation_date: Date;
    cremation_location: string;
    service_id: number;
    service?: Service;
}
