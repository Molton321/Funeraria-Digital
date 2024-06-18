import { Service } from "../service/service.model";

export class Transfer {
    id?: number;
    transfer_from: string;
    transfer_to: string;
    transfer_date: Date;
    service_id: number;
    service?: Service;
}
