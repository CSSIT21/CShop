export class CreateUserSuspensionDto {
    customer_id: number;
    description: string;
    picture_id: number;
    suspension_type_id: number;
    admin_id : number;
    day: number;
    month: number;
    year: number;
}