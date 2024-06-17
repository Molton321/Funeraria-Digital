import { Client } from "../client/client.model";
import { Owner } from "../owner/owner.model";

export class Beneficiary {
    id?:number;
    beneficiary_relationship:string;
    beneficiary_state:boolean;
    owner_id: string;
    client_id: string;
    owner?: Owner;
    client?: Client;
}
