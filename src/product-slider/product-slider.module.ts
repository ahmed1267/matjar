import { Module, forwardRef } from '@nestjs/common';
import { ProductSliderService } from './product-slider.service';
import { ProductSliderController } from './product-slider.controller';
import { ProductSlider, ProductSliderSchema } from './schemas/productSlider_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';


@Module({
  imports: [MongooseModule.forFeature([
    { name: ProductSlider.name, schema: ProductSliderSchema },
    { name: Shop.name, schema: ShopSchema },])],
  controllers: [ProductSliderController],
  providers: [ProductSliderService],
  exports: [MongooseModule.forFeature([{ name: ProductSlider.name, schema: ProductSliderSchema }]), ProductSliderService]
})
export class ProductSliderModule { }
