import { PlanService } from "../plan-service/plan-service.model";
import { Subscription } from "../subscription/subscription.model";

export class Plan {
    id?: number;
    plan_type: string;
    plan_description: string;
    plan_price: number;
    plan_beneficiaries_number: number;
    plan_state: boolean;
    planServices?: PlanService[];
    subscriptions?: Subscription[];
}
