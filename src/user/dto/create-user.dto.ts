import { Prop } from '@nestjs/mongoose';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsEmail,
  Matches,
  ArrayUnique,
} from 'class-validator';

import {
  ReadyOption,
  UserExperienceType,
  UserRole,
} from '../schemas/user_schema';
import { Types } from 'mongoose';

export class CreateUserDto {
  // Shop title, must not be empty, and should be a string
  @IsNotEmpty({ message: 'A user must have a title' })
  @IsString({ message: 'A user must have a string title' })
  name: string;

  // User password, must not be empty, and should be a valid date string
  @IsNotEmpty({ message: 'A user must have a password' })
  @IsString({ message: 'A user must have a string password' })
  @MinLength(6, { message: 'A user password must be 6 chracters minimum' })
  @MaxLength(25, { message: 'A user password must be 25 chracters maximum' })
  password: string;

  // User Role, must not be empty and should be of the current options
  @Prop({ required: true })
  @IsNotEmpty({ message: 'A user must have a role' })
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role: UserRole;

  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
    message: 'Invalid phone number format',
  })
  phone: string;

  @IsNotEmpty({ message: 'A user must have user experinece' })
  experince: boolean;

  @IsNotEmpty({
    message: 'It must be known if the user had a first store or not',
  })
  firstShop: boolean;

  @IsNotEmpty({ message: 'A user must have user experinece type' })
  @IsEnum(UserExperienceType, { message: 'Invalid Experience Type' })
  userExperienceType: UserExperienceType;

  @Prop({ enum: ReadyOption, isArray: true })
  @IsEnum(ReadyOption, { each: true, message: 'Invalid ready option' })
  @ArrayUnique({ message: 'Duplicate ready options are not allowed' })
  ready: ReadyOption[];

  wallet: number
  cart: Types.ObjectId[]
}
