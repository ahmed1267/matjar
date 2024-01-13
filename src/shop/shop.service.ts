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

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name)
    private shopModel: mongoose.Model<Shop>,
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
}
