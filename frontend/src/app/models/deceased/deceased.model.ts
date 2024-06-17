import { Client } from "../client/client.model";
import { ServiceExecution } from "../service-execution/service-execution.model";

export class Deceased {
    id?: number;
    deceased_death_date: Date;
    deceased_location: string;
    client_id: number;
    serviceExecutions?: ServiceExecution[];
    client?: Client;
}
