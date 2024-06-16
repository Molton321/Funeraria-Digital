import { Role } from "../role/role.model";

export class User {
    id?: string;
    name: string;
    email: string;
    password: string;
    resetCode: string;
    role?: Role;
}
