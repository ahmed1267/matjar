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
import { Category, CategorySchema } from 'src/category/schemas/category_schema';
import { Item, ItemSchema } from 'src/item/schemas/item-schema';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ItemModule } from 'src/item/item.module';
import { ReviewContainer, ReviewContainerSchema } from 'src/review-container/schemas/reviewContainer_schema';
import { ReviewContainerModule } from 'src/review-container/review-container.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Shop.name, schema: ShopSchema },
    { name: Item.name, schema: ItemSchema },
    { name: User.name, schema: UserSchema },
    { name: Category.name, schema: CategorySchema },
    { name: ProductSlider.name, schema: ProductSliderSchema },
    { name: CardSlider.name, schema: CardSliderSchema },
    { name: PhotoSlider.name, schema: PhotoSliderSchema },
    { name: Review.name, schema: ReviewSchema },
    { name: ReviewContainer.name, schema: ReviewContainerSchema },
  ]), forwardRef(() => AuthModule), forwardRef(() => ProductSliderModule),
  forwardRef(() => CategoryModule), forwardRef(() => ItemModule), forwardRef(() => PhotoSliderModule),
  forwardRef(() => CardSliderModule), forwardRef(() => ReviewModule), forwardRef(() => UserModule), forwardRef(() => ReviewContainerModule), ShopModule],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopModule, MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),]
})
export class ShopModule { }
