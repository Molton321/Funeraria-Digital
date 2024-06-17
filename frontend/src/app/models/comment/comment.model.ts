import { ServiceExecution } from "../service-execution/service-execution.model";

export class Comment {
    id?: number;
    comment_date: Date;
    comment_text: string;
    comment_calification: number;
    service_execution_id: number;
    serviceExecution?: ServiceExecution;
}
