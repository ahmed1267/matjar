import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './create-shop.dto';
import { IsString, IsOptional, IsDate, IsEnum } from 'class-validator'

export class UpdateShopDto extends PartialType(CreateShopDto) {
    category?: string[];
}

