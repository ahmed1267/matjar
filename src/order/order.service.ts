import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import * as mongoose from 'mongoose';

import { Order, OrderDocument } from './schemas/order_schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { User, UserDocument } from 'src/user/schemas/user_schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<UserDocument>,
    @InjectModel(Order.name) private readonly orderModel: mongoose.Model<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { buyerID, sellerID } = createOrderDto
    if(buyerID == sellerID) throw new UnauthorizedException('You cant make an order from your own shop')
    const priceTotal =createOrderDto.items.reduce((partial,item)=>partial+item.price,0 )
    createOrderDto.priceTotal=priceTotal
    const order =  await new this.orderModel(createOrderDto).save().catch(err=>{
      console.log(err)
      throw new InternalServerErrorException('An unexpected error happened while creating the order!')
    })

  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
