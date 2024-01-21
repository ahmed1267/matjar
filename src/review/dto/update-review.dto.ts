import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    rating: number;
    description: string;
    @IsNotEmpty({ message: 'A review must belong to a shop!' })
    shop: Types.ObjectId;
    @IsNotEmpty({ message: 'A review must belong to a shop!' })
    user: Types.ObjectId;
    product: string;
    title: string;
}
