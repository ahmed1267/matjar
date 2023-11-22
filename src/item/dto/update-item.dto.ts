import { PartialType } from '@nestjs/mapped-types';
import { Category, CreateItemDto } from './create-item.dto';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsEmail, IsOptional } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    // Item title, must not be empty, and should be a string
    @IsOptional()
    @IsNotEmpty({ message: 'An item must have a title' })
    @IsString({ message: 'An item must have a string title' })
    name?: string;

    // User password, must not be empty, and should be a valid date string
    @IsOptional()
    @IsNotEmpty({ message: 'An item must have a description' })
    @IsString({ message: 'An item description must be string' })
    @MinLength(20, { message: 'An item description must be 6 chracters minimum' })
    @MaxLength(150, { message: 'An item description must be 150 chracters maximum' })
    description?: String;

    // User Role, must not be empty and should be of the current options
    @IsOptional()
    @IsNotEmpty({ message: 'An item must have a category' })
    @IsEnum(Category, { each: true, message: 'Invalid ready option' })
    category?: Category[];

    @Prop({ required: true })
    @IsNotEmpty({ message: 'Image is required' })
    @IsEmail()
    @IsOptional()
    image?: string;
}
