import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { ShopModule } from 'src/shop/shop.module';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { UserModule } from 'src/user/user.module';
import { Review, ReviewSchema } from './schemas/review_schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Review.name, schema: ReviewSchema },
    { name: Shop.name, schema: ShopSchema },
    { name: User.name, schema: UserSchema },]), ShopModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
