import { Burial } from "../burial/burial.model";
import { Cremation } from "../cremation/cremation.model";
import { PlanService } from "../plan-service/plan-service.model";
import { ServiceExecution } from "../service-execution/service-execution.model";
import { Viewing } from "../viewing/viewing.model";

export class Service {
    id?: number;
    service_state: boolean;
    service_description: string;
    service_observation: string;
    planServices?: PlanService[];
    serviceExecutions?: ServiceExecution[];
    // transfer?: Transfer;
    burial?: Burial;
    cremation?: Cremation;
    viewing?: Viewing;
}
