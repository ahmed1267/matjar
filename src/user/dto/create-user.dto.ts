import { IsNotEmpty, IsString, IsArray, IsDateString, Validate, MinLength, MaxLength, IsEnum } from 'class-validator';

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

    // User username, must not be empty, and should be a string
    @IsNotEmpty({ message: 'A user must have a username' })
    @IsString({ message: 'A user must have a string username' })
    @MinLength(6, { message: 'A user username must be 6 chracters minimum' })
    @MaxLength(20, { message: 'A user username must be 20 chracters maximum' })
    username: string;

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
}