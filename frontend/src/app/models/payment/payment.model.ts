import { Subscription } from "../subscription/subscription.model";

export class Payment {
    id?:number;
    payment_date: Date;
    payment_amount: number;
    payment_method: string;
    subscription_id: number;
    subscription?: Subscription;
}
