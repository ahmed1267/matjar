import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateReviewDto {
    rating: number;
    description: string;
    @IsNotEmpty({ message: 'A review must belong to a shop!' })
    shop: Types.ObjectId;
    @IsNotEmpty({ message: 'A review must belong to a shop!' })
    user: Types.ObjectId;
    product: string;
    title: string;
}
