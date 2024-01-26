import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    name: string;
    price: number;
    amount: number;
    userID: string;
    description: string;
    category: string[];

    brand?: string;
    rating?: number;
    sizes?: string[];
    images?: string[];
    colors?: string[];
}
