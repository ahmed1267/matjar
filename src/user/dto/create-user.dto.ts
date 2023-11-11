import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsArray, IsDateString, Validate, MinLength, MaxLength, IsEnum, IsEmail, IsPhoneNumber, Matches } from 'class-validator';

export enum UserRole {
    admin = 'admin',
    user = 'user',
    shopOwner = 'shopOwner'
}
export class CreateUserDto {
    // Shop title, must not be empty, and should be a string
    @IsNotEmpty({ message: 'A user must have a title' })
    @IsString({ message: 'A user must have a string title' })
    name: string;

    // User password, must not be empty, and should be a valid date string
    @IsNotEmpty({ message: 'A user must have a password' })
    @IsString({ message: 'A user must have a string password' })
    @MinLength(6, { message: 'A user password must be 6 chracters minimum' })
    @MaxLength(150, { message: 'A user password must be 150 chracters maximum' })
    password: String;

    // User Role, must not be empty and should be of the current options
    @IsNotEmpty({ message: 'A user must have a role' })
    @IsEnum(UserRole, { message: 'Invalid user role' })
    role: UserRole;

    @Prop({ required: true, unique: true })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @Prop({ required: true, unique: true })
    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: 'Invalid phone number format' })
    phone: string;
}