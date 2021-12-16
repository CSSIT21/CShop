import { IsDate } from "class-validator";

export class ReviewDto{

    customerId: number;

    rating: number;
    comment: string;
    review_picture_id: [];

    @IsDate()
    review_time: Date;
}