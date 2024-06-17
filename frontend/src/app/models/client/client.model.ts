import { Beneficiary } from "../beneficiary/beneficiary.model";
import { Deceased } from "../deceased/deceased.model";
import { Owner } from "../owner/owner.model";
import { ServiceExecution } from "../service-execution/service-execution.model";
import { Subscription } from "../subscription/subscription.model";

export class Client {
    id?:number;
    client_address:string;
    client_phone:string;
    client_state:boolean;
    user_id: string;
    user?: string;
    email?: string;
    is_owner?: string;
    is_beneficiary?: string;
    is_deceased?: string;
    subscriptions?: Subscription[];
    serviceExecutions?: ServiceExecution[];
    owner?: Owner;
    beneficiary?: Beneficiary;
    deceased?: Deceased;
}
