import { Module } from '@nestjs/common';
import { CardSliderService } from './card-slider.service';
import { CardSliderController } from './card-slider.controller';
import { ShopModule } from 'src/shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { CardSlider, CardSliderSchema } from './schemas/cardSlider_schema';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: CardSlider.name, schema: CardSliderSchema },
    { name: Shop.name, schema: ShopSchema },]), ShopModule,
  JwtModule.register({
    secret: `${process.env.SECRET}`,
    signOptions: { expiresIn: '1d' },
    global: true,
  }),],
  controllers: [CardSliderController],
  providers: [CardSliderService],
})
export class CardSliderModule { }
