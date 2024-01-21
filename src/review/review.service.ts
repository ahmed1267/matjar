import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review_schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) { }
  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewModel.create(createReviewDto).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while creating the review!')
      })
      return review;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while creating the review!')
    }
  }

  async findAll(user?: string, shop?: string, item?: string) {
    try {
      const reviews = await this.reviewModel.find({
        shop,
        user: user,
        item
      }).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while getting the reviews!')
      })
      return reviews
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while getting the reviews!')
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewModel.findById(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while finding the review!')
      })
      return review
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while finding the review!')
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while updating the review!')
      })
      return review
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while updating the review!')
    }
  }

  async remove(id: string, userId: string) {
    try {
      const review = await this.reviewModel.findById(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while getting the review!')
      })

      if (review.shop == userId) throw new BadRequestException('You cant delete reviews from your own shop!')

      if (review.user != userId) throw new BadRequestException('You cant delete this review!')

      await this.reviewModel.deleteOne({ id }).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An unexpected error happened while removing the review!')
      })

      return "review has been deleted successfully!"

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('An unexpected error happened while removing the review!')
    }
  }
}
