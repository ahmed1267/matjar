import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/order/schemas/order_schema';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { Item, ItemSchema } from 'src/item/schemas/item-schema';
import { User, UserSchema } from 'src/user/schemas/user_schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), 
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]), 
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, Order, Shop, Item, User],
})
export class ReportsModule {}
