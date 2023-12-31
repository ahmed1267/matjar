import { Types } from 'mongoose';

export class CreateCouponDto {
  text: string;
  endDate: Date;
  numOfTimes: number;
  numOfCustomers: number;
  discountPercentage: number;

  user: Types.ObjectId;
  items: Types.ObjectId[];
  subscriptCustomers?: Types.ObjectId[];
}
