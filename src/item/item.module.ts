import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item-schema';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
