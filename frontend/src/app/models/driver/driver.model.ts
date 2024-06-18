import { Displacement } from "../displacement/displacement.model";

export class Driver {
    id?: number;
    driver_license: string;
    driver_license_category: string;
    driver_license_expiration: Date;
    user_id: string;
    user?: string;
    email?: string;
    displacements?: Displacement[];
    
}
