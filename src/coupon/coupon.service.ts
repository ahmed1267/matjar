import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './schemas/coupon.schema';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      const coupon = await new this.couponModel(createCouponDto).save();

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(page: number = 0, user?: Types.ObjectId) {
    try {
      const coupons = await this.couponModel
        .find({
          user,
        })
        .limit(10)
        .skip(10 * page);

      return coupons;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const coupon = await this.couponModel.findById(id);

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: Types.ObjectId, updateCouponDto: UpdateCouponDto) {
    try {
      const coupon = await this.couponModel.findByIdAndUpdate(
        id,
        updateCouponDto,
        { new: true },
      );

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: Types.ObjectId) {
    try {
      const coupon = await this.couponModel.findByIdAndRemove(id);

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addCustomer(id: Types.ObjectId, customer: Types.ObjectId) {
    try {
      const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, {
        $push: {
          subscriptCustomers: customer,
        },
      });

      return updatedCoupon;
    } catch (error) {
      throw new InternalServerErrorException(error, "Can't Add Customer");
    }
  }

  async addItem(id: Types.ObjectId, item: Types.ObjectId) {
    try {
      const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, {
        $push: {
          items: item,
        },
      });

      return updatedCoupon;
    } catch (error) {
      throw new InternalServerErrorException(error, "Can't Add Item");
    }
  }

  async changeDiscount(id: Types.ObjectId, discount: number) {
    try {
      const coupon = await this.couponModel.findByIdAndUpdate(id, {
        discountPercentage: discount,
      });

      return coupon;
    } catch (error) {
      throw new InternalServerErrorException(error, "Can't Add Item");
    }
  }
}
