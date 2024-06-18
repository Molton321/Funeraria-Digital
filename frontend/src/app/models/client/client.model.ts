import { Beneficiary } from "../beneficiary/beneficiary.model";
import { Owner } from "../owner/owner.model";
import { ServiceExecution } from "../service-execution/service-execution.model";
import { Subscription } from "../subscription/subscription.model";

export class Client {
    id?:number;
    client_address:string;
    client_phone:string;
    client_state:boolean;
    client_alive:boolean;
    user_id: string;
    user?: string;
    email?: string;
    is_owner?: string;
    is_beneficiary?: string;
    subscriptions?: Subscription[];
    serviceExecutions?: ServiceExecution[];
    owner?: Owner;
    beneficiary?: Beneficiary;
    deceased?: ServiceExecution;
}
