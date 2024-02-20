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
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) { }

  async create(createItemDto: CreateItemDto) {
    try {
      const item = await new this.itemModel(createItemDto).save().catch(err => {
        console.log(err);
        if (err == 11000) throw new InternalServerErrorException('Item name already exists!')

        else throw new InternalServerErrorException(err);
      });
      const shop = await this.shopModel.findById(item.shopID).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      })

      shop.itemsIDs.push(item.id);
      await shop.save().catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      })
      return item;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        err
      );
    }
  }

  async findAll(page: number, shopID?: string, category?: string, subCategory?: string, sortOrder?: string) {
    try {
      const query = { shopID, category, subCategory };
      for (let key in query) {
        if (!query[key]) delete query[key];
      }

      const sortCriteria = {};
      if (sortOrder === 'asc') {
        sortCriteria['price'] = 1;
      } else if (sortOrder === 'desc') {
        sortCriteria['price'] = -1;
      }

      const items = await this.itemModel
        .find({ ...query })
        .sort(sortCriteria)
        .catch(err => {
          console.log(err);
          throw new InternalServerErrorException(err);
        });

      const count = await this.itemModel
        .find({ ...query })
        .countDocuments();

      return { count, items };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }


  async findOne(id: string) {
    try {
      const item = await this.itemModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);


      });
      if (!item) throw new InternalServerErrorException('Item not found!');
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const { images, colors, sizes, category, ...rest } = updateItemDto;
      const item = await this.itemModel.findByIdAndUpdate(id, rest, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      });


      if (images && images.length > 0) {
        item.images.push(...images);
      }
      if (colors && colors.length > 0) {
        item.colors.push(...colors);
      }
      if (sizes && sizes.length > 0) {
        item.sizes.push(...sizes);
      }
      if (category) {
        item.category.push(...category);
      }

      await item.save();

      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async remove(id: string) {
    try {
      const item = await this.itemModel.findByIdAndRemove(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      });
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
