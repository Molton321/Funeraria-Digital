import { Chat } from "../chat/chat.model";
import { Client } from "../client/client.model";
import { Comment } from "../comment/comment.model";
import { Deceased } from "../deceased/deceased.model";
import { Service } from "../service/service.model";

export class ServiceExecution {
    id?: number;
    service_execution_date: Date;
    service_id: number;
    client_id: number;
    deceased_id: number;
    client?: Client;
    service?: Service;
    deceased?: Deceased;
    comments?: Comment[];
    chat?: Chat;
}
