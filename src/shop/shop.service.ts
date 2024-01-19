import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import * as mongoose from 'mongoose';

import { Shop } from './schemas/shop_schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateShopDto } from './dto/create-shop.dto';
import { Review, ReviewDocument } from 'src/review/schemas/review_schema';
import { ProductSlider, ProductSliderDocument } from 'src/product-slider/schemas/productSlider_schema';
import { PhotoSlider, PhotoSliderDocument } from 'src/photo-slider/schemas/photoSlider_schema';
import { CardSlider, CardSliderDocument } from 'src/card-slider/schemas/cardSlider_schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name)
    private shopModel: mongoose.Model<Shop>,
    @InjectModel(Review.name) private reviewModel: mongoose.Model<ReviewDocument>,
    @InjectModel(ProductSlider.name) private productSliderModel: mongoose.Model<ProductSliderDocument>,
    @InjectModel(PhotoSlider.name) private photoSliderModel: mongoose.Model<PhotoSliderDocument>,
    @InjectModel(CardSlider.name) private cardSliderModel: mongoose.Model<CardSliderDocument>,
  ) { }

  async create(createShopDto: CreateShopDto) {
    try {
      const shop = await new this.shopModel(createShopDto).save();

      return shop;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(page: number = 0) {
    try {
      const shops = await this.shopModel
        .find()
        .limit(10)
        .skip(page * 10);

      const count = await this.shopModel.find().countDocuments();

      return { count, shops };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Shop> {
    try {
      const idValid = mongoose.isValidObjectId(id);
      if (!idValid) throw new BadRequestException('Please enter correct Id');

      const foundShop = await (
        await this.shopModel.findById(id)
      ).populate('itemsIDs', 'name');

      if (!foundShop)
        throw new NotFoundException('There is no shop with this id');

      return foundShop;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findUserShops(userId: string, page: number = 0) {
    try {
      const shops = await this.shopModel
        .find({
          userID: userId,
        })
        .limit(10)
        .skip(page * 10);

      const counts = await this.shopModel
        .find({
          userID: userId,
        })
        .countDocuments();

      return { counts, shops };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    try {
      const shop = await this.shopModel.findByIdAndUpdate(id, updateShopDto, {
        new: true,
      });

      return shop;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findShopItems(id: string) {
    try {
      const shop = await this.shopModel.findById(id).populate('itemsIDs').exec().catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An expected error happened while finding shop items')
      })
      const items = shop.itemsIDs
      return items
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while finding shop items')

    }
  }

  async remove(id: string) {
    try {
      const shop = await this.shopModel.findByIdAndRemove(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An expected error happened while removing shop')
      });

      return shop;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findShopContainers(id: string): Promise<Object> {

    try {
      const shop = await this.shopModel.findById(id).catch(err => {
        console.log(err)
        throw new InternalServerErrorException('An expected error happened while finding shop containers')
      })
      let containers = []
      shop.containers.forEach(async container => {
        switch (container.containerType) {
          case 'review':
            const review = await this.reviewModel.findById(container.containerID).catch(err => {
              console.log(err)
              throw new InternalServerErrorException('An expected error happened while finding shop containers')
            })
            containers.push(review)
          case 'product slider':
            const productSlider = await this.productSliderModel.findById(container.containerID).catch(err => {
              console.log(err)
              throw new InternalServerErrorException('An expected error happened while finding shop containers')
            })
            containers.push(productSlider)

          case 'photo slider':
            const photoSlider = await this.photoSliderModel.findById(container.containerID).catch(err => {
              console.log(err)
              throw new InternalServerErrorException('An expected error happened while finding shop containers')
            })
            containers.push(photoSlider)
          case 'card slider':
            const cardSlider = await this.cardSliderModel.findById(container.containerID).catch(err => {
              console.log(err)
              throw new InternalServerErrorException('An expected error happened while finding shop containers')
            })
            containers.push(cardSlider)

        }
      })
      return containers;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while finding shop containers')
    }

  }
}
