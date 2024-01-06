import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(JwtGuard)
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


  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Param('buyerId') buyerId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, buyerId, updateOrderDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
