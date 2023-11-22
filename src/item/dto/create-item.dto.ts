import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsArray, IsDateString, Validate, MinLength, MaxLength, IsEnum, IsEmail, IsPhoneNumber, Matches } from 'class-validator';

export enum Category {
    ACCSESSORIES = 'accessories',
    HOME = 'home',
    GYM = 'gym',
    OTHERS= 'others'
}
export class CreateItemDto {
    // Item title, must not be empty, and should be a string
    @IsNotEmpty({ message: 'An item must have a title' })
    @IsString({ message: 'An item must have a string title' })
    name: string;

    // User password, must not be empty, and should be a valid date string
    @IsNotEmpty({ message: 'An item must have a description' })
    @IsString({ message: 'An item description must be string' })
    @MinLength(20, { message: 'An item description must be 6 chracters minimum' })
    @MaxLength(150, { message: 'An item description must be 150 chracters maximum' })
    description: String;

    // User Role, must not be empty and should be of the current options
    @IsNotEmpty({ message: 'An item must have a category' })
    @IsEnum(Category, { each: true, message: 'Invalid ready option' })
    category: Category[];

    @Prop({ required: true })
    @IsNotEmpty({ message: 'Image is required' })
    @IsEmail()
    image: string;

}