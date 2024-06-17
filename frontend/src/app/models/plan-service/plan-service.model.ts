import { Plan } from "../plan/plan.model";
import { Service } from "../service/service.model";

export class PlanService {
    id?: number;
    service_id: number;
    plan_id: number;
    service?: Service;
    plan?: Plan;
}
