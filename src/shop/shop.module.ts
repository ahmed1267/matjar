import { Module, forwardRef } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop_schema';
import { ReviewModule } from 'src/review/review.module';
import { Review, ReviewSchema } from 'src/review/schemas/review_schema';
import { ProductSlider, ProductSliderSchema } from 'src/product-slider/schemas/productSlider_schema';
import { PhotoSlider, PhotoSliderSchema } from 'src/photo-slider/schemas/photoSlider_schema';
import { CardSlider, CardSliderSchema } from 'src/card-slider/schemas/cardSlider_schema';
import { CardSliderModule } from 'src/card-slider/card-slider.module';
import { PhotoSliderModule } from 'src/photo-slider/photo-slider.module';
import { ProductSliderModule } from 'src/product-slider/product-slider.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Shop.name, schema: ShopSchema },
    { name: Review.name, schema: ReviewSchema },
    { name: ProductSlider.name, schema: ProductSliderSchema },
    { name: PhotoSlider.name, schema: PhotoSliderSchema },
    { name: CardSlider.name, schema: CardSliderSchema },
  ]), forwardRef(() => ProductSliderModule), forwardRef(() => PhotoSliderModule), forwardRef(() => CardSliderModule), forwardRef(() => ReviewModule), ShopModule],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopModule, MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),]
})
export class ShopModule { }
