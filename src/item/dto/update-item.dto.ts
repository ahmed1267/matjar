import { PartialType } from '@nestjs/mapped-types';
import { Category, CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    name: string;
    price: number;
    amount: number;
    userID: string;
    description: string;
    category: Category[];

    brand?: string;
    rating?: number;
    sizes?: string[];
    images?: string[];
    colors?: string[];
}
