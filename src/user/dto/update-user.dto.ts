// update-user.dto.ts
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  ArrayUnique,
  IsNotEmpty,
} from 'class-validator';

import {
  ReadyOption,
  UserExperienceType,
  UserRole,
} from '../schemas/user_schema';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'A user must have a string title' })
  name?: string;

  @IsNotEmpty({ message: 'Please send the ID of the user you want to update' })
  @IsString()
  currentId: string;

  @IsNotEmpty({ message: 'Please send the ID of the user you want to update' })
  @IsString()
  updateId: string;

  @IsOptional()
  @IsString({ message: 'A user must have a string password' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role?: UserRole;

  @IsOptional()
  @IsString({ message: 'Invalid email' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Invalid phone number format' })
  phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'Invalid value for experience' })
  experince?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Invalid value for firstShop' })
  firstShop?: boolean;

  @IsOptional()
  @IsEnum(UserExperienceType, { message: 'Invalid Experience Type' })
  userExperienceType?: UserExperienceType;

  @IsOptional()
  @IsEnum(ReadyOption, { each: true, message: 'Invalid ready option' })
  @ArrayUnique({ message: 'Duplicate ready options are not allowed' })
  ready?: ReadyOption[];

  wallet: number
  cart: Types.ObjectId[]
}
