import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query('buyerId') buyerId: string, @Query('sellerId') sellerId: string) {
    if (buyerId) {
      return this.orderService.findAllByBuyer(buyerId);
    } else if (sellerId) {
      return this.orderService.findAllBySeller(sellerId);
    } else {
      return { message: 'Please provide either buyerId or sellerId' };
    }
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Param('buyerId') buyerId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, buyerId, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
