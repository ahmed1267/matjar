import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { Types } from 'mongoose';
import { IsString, IsDate, IsNumber, IsArray } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsString({ message: "text must be string" })
  text: string;
  @IsDate({ message: "Date must be in the right format" })
  endDate: Date;
  @IsNumber()
  numOfTimes: number;
  @IsNumber()
  numOfCustomers: number;
  @IsNumber()
  discountPercentage: number;
  @IsString()
  user: Types.ObjectId;
  @IsArray()
  items: Types.ObjectId[];
  @IsArray()
  subscriptCustomers?: Types.ObjectId[];
}
