import { Module, forwardRef } from '@nestjs/common';
import { CardSliderService } from './card-slider.service';
import { CardSliderController } from './card-slider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { CardSlider, CardSliderSchema } from './schemas/cardSlider_schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CardSlider.name, schema: CardSliderSchema },
    { name: Shop.name, schema: ShopSchema },])],
  controllers: [CardSliderController],
  providers: [CardSliderService],
  exports: [MongooseModule.forFeature([{ name: CardSlider.name, schema: CardSliderSchema }]), CardSliderService]
})
export class CardSliderModule { }
