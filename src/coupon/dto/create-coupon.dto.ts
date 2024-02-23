import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
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
