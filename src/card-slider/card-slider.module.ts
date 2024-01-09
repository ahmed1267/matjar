import { Module } from '@nestjs/common';
import { CardSliderService } from './card-slider.service';
import { CardSliderController } from './card-slider.controller';
import { ShopModule } from 'src/shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { CardSlider, CardSliderSchema } from './schemas/cardSlider_schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CardSlider.name, schema: CardSliderSchema },
    { name: Shop.name, schema: ShopSchema },]), ShopModule],
  controllers: [CardSliderController],
  providers: [CardSliderService],
})
export class CardSliderModule { }
