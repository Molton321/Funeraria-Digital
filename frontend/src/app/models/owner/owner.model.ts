import { Beneficiary } from "../beneficiary/beneficiary.model";
import { Client } from "../client/client.model";

export class Owner {
    id?:number;
    owner_state:boolean;
    client_id: string;
    client?: Client;
    beneficiaries?: Beneficiary[];
}
