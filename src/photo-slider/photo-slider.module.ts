import { Module, forwardRef } from '@nestjs/common';
import { PhotoSliderService } from './photo-slider.service';
import { PhotoSliderController } from './photo-slider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { PhotoSlider, PhotoSliderSchema } from './schemas/photoSlider_schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: PhotoSlider.name, schema: PhotoSliderSchema },
    { name: Shop.name, schema: ShopSchema },])],
  controllers: [PhotoSliderController],
  providers: [PhotoSliderService],
  exports: [MongooseModule.forFeature([{ name: PhotoSlider.name, schema: PhotoSliderSchema }]), PhotoSliderService]
})
export class PhotoSliderModule { }
