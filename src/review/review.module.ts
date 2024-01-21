import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './schemas/review_schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Review.name, schema: ReviewSchema },])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService, MongooseModule.forFeature([
    { name: Review.name, schema: ReviewSchema },])]
})
export class ReviewModule { }
