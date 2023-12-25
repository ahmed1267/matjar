import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Category, Item, ItemDocument } from './schemas/item-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) { }

  async create(createItemDto: CreateItemDto) {
    try {
      const item = await new this.itemModel(createItemDto).save();

      return item;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error while adding the item',
      );
    }
  }

  async findAll(page: number = 0, userId?: string, category?: Category) {
    try {
      const items = await this.itemModel
        .find({
          userID: userId,
          category,
        })
        .limit(10)
        .skip(page * 10).catch(err => {
          console.log(err);
          throw new InternalServerErrorException('An unexpected error happened while finding the items!');

        });

      const count = await this.itemModel
        .find({
          userID: userId,
          category,
        })
        .countDocuments();

      return { count, items };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.itemModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the item!');


      });
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const item = await this.itemModel.findByIdAndUpdate(id, updateItemDto, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while updating the item!');



      });

      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const item = await this.itemModel.findByIdAndRemove(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the item!');
      });
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
