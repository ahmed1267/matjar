import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/order/schemas/order_schema';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { Item, ItemSchema } from 'src/item/schemas/item-schema';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { Reports, ReportsSchema } from './schemas/reports_schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Reports.name, schema: ReportsSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Item.name, schema: ItemSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule { }
