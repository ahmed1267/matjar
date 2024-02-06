import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { Types } from 'mongoose';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  text: string;
  endDate: Date;
  numOfTimes: number;
  numOfCustomers: number;
  discountPercentage: number;
}
