import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) { }

  async create(createItemDto: CreateItemDto) {
    try {
      const item = await new this.itemModel(createItemDto).save().catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while adding the item!');
      });
      const shop = await this.shopModel.findById(item.shopID).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while adding the item!');
      })

      shop.itemsIDs.push(item.id);
      await shop.save().catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while adding the item!');
      })
      return item;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error while adding the item',
      );
    }
  }

  async findAll(page: number = 0, shopId?: string, category?: string, subCategory?: string) {
    try {
      const items = await this.itemModel
        .find({
          shopID: shopId,
          category,
          subCategory: { $in: subCategory }
        })
        .limit(10)
        .skip(page * 10).catch(err => {
          console.log(err);
          throw new InternalServerErrorException('An unexpected error happened while finding the items!');

        });



      const count = await this.itemModel
        .find({
          shopID: shopId,
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
