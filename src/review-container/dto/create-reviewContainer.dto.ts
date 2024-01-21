import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateReviewContainerDto {
    rating: number;
    description: string;
    shop: Types.ObjectId;

    user: Types.ObjectId;
    item: string;
    title: string;

    @IsNotEmpty({ message: 'review container must have a refrence review' })
    review: string
}
