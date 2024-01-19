import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';
import { User, UserDocument } from 'src/user/schemas/user_schema';
import { Review, ReviewDocument } from './schemas/review_schema';


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }
  async create(createReviewDto: CreateReviewDto) {
    try {
      const user = await this.userModel.findById(createReviewDto.user).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the user!');

      })
      if (user.id == createReviewDto.shop) throw new UnauthorizedException('You cant review your own shop')
      const review = await new this.reviewModel(createReviewDto).save();
      const shop = await this.shopModel.findById(createReviewDto.shop);
      shop.containers.push({ containerID: review.id, containerType: 'review' });

      await shop.save();
      user.reviews.push(review.id);
      return review;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error while adding the product Slider',
      );
    }
  }

  async findAll() {
    try {
      const review = await this.reviewModel.find().catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened!');
      })
      return review;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the product slider!');


      });
      return review;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.reviewModel.findByIdAndUpdate(id, updateReviewDto, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while updating the review!');
      });

      return review;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const review = await this.reviewModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the review!');
      });
      const shop = await this.shopModel.findById(review.shop).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the review!');

      })
      for (let i = 0; i < shop.containers.length; i++) {
        if (shop.containers[i].containerID === id) {
          shop.containers.splice(i, 1);
          break;
        }
      }
      await shop.save();
      const user = await this.userModel.findById(review.user).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the review!');
      })
      for (let i = 0; i < user.reviews.length; i++) {
        if (user.reviews[i] === id) {
          user.reviews.splice(i, 1);
          break;
        }
      }
      await user.save();
      await this.reviewModel.findByIdAndDelete(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the review!');
      })
      return review;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
