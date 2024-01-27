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


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: mongoose.Model<OrderDocument>,
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    try {
      const { buyerId, sellerId } = createOrderDto
      if (buyerId == sellerId) throw new UnauthorizedException('You cant make an order from your own shop')
      const priceTotal = createOrderDto.items.reduce((partial, item) => partial + item.price, 0)
      createOrderDto.priceTotal = priceTotal
      const order = await new this.orderModel(createOrderDto).save().catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while creating the order!')
      })
      return order

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while creating the order!')
    }

  }

  async findAll(buyerId: string, sellerId: string) {
    try {
      const query = { buyerId, sellerId }

      for (let key in query) {
        if (!query[key]) delete query[key]
      }

      const orders = await this.orderModel.find({ ...query }).populate({ path: "buyerId", select: "name, email" }).populate({
        path: 'items.itemId',
        model: 'Item',
      }).exec().catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while finding the orders')
      })

      return orders
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the orders')
    }
  }

  async findAllByBuyer(id) {
    try {
      const orders = await this.orderModel.find({ buyerID: id }).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while finding the orders')
      })
      return orders
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the orders')
    }
  }

  async findAllBySeller(id) {
    try {
      const orders = await this.orderModel.find({ buyerID: id }).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while finding the orders')
      })
      return orders
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the orders')
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id).populate("items", "buyerId").catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while finding the order')
      })
      return order
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the order')

    }
  }

  async update(id: string, buyerId: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderModel.findById(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened when finding the order')
      })
      if (order.buyerId != buyerId) throw new UnauthorizedException("You can't adjust an order you didn't create")
      if (updateOrderDto.items) {
        const newTotalPrice = updateOrderDto.items.reduce((partial, item) => partial + item.price, 0)
        updateOrderDto.priceTotal = newTotalPrice
      }
      const newOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened when updating the order!')
      }
      )
      return newOrder
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the order')

    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderModel.findByIdAndDelete(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while deleting the order')
      })
      return 'Order has been deleted succesfully'
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while deleting the order')
    }
  }
}
