import { Client } from "../client/client.model";
import { Payment } from "../payment/payment.model";
import { Plan } from "../plan/plan.model";

export class Subscription {
    id?:number;
    subscription_start_date: Date;
    subscription_end_date: Date;
    subscription_payments_number: number;
    plan_id: number;
    client_id: number;
    payments?: Payment[];
    plan?: Plan;
    client?: Client;
}
