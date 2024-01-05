import { Module } from '@nestjs/common';
import { PhotoSliderService } from './photo-slider.service';
import { PhotoSliderController } from './photo-slider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { ShopModule } from 'src/shop/shop.module';
import { PhotoSlider, PhotoSliderSchema } from './schemas/photoSlider_schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PhotoSlider.name, schema: PhotoSliderSchema },
    { name: Shop.name, schema: ShopSchema },]), ShopModule],
  controllers: [PhotoSliderController],
  providers: [PhotoSliderService],
})
export class PhotoSliderModule { }
