import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

import { Types } from 'mongoose';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Patch('/discount')
  changeDiscount(@Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.changeDiscount(
      updateCouponDto.id,
      updateCouponDto.discountPercentage,
    );
  }

  @Patch('/customers/add')
  addCustomer(
    @Body('id') id: Types.ObjectId,
    @Body('customer') customer: Types.ObjectId,
  ) {
    return this.couponService.addCustomer(id, customer);
  }

  @Patch('/items/add')
  addItem(@Body('id') id: Types.ObjectId, @Body('item') item: Types.ObjectId) {
    return this.couponService.addItem(id, item);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.couponService.remove(id);
  }
}
