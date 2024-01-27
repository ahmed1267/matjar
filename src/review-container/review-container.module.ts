import { Module, forwardRef } from '@nestjs/common';
import { ReviewContainerService } from './review-container.service';
import { ReviewContainerController } from './review-container.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { UserModule } from 'src/user/user.module';
import { ReviewContainer, ReviewContainerSchema } from './schemas/reviewContainer_schema';
import { Review, ReviewSchema } from 'src/review/schemas/review_schema';



@Module({
  imports: [MongooseModule.forFeature([
    { name: ReviewContainer.name, schema: ReviewContainerSchema },
    { name: Shop.name, schema: ShopSchema },
    { name: User.name, schema: UserSchema },
    { name: Review.name, schema: ReviewSchema }]), UserModule],
  controllers: [ReviewContainerController],
  providers: [ReviewContainerService],
  exports: [MongooseModule.forFeature([{ name: ReviewContainer.name, schema: ReviewContainerSchema }]), ReviewContainerService]
})
export class ReviewContainerModule { }
