import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateReviewDto {
    rating: number;
    description: string;
    @IsNotEmpty({ message: 'A Review must have a shop ID' })
    shop: Types.ObjectId;
    @IsNotEmpty({ message: 'A Review must have a User ID' })
    user: Types.ObjectId;
    product: string;
    title: string;
}
