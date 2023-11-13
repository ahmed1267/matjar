import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Category, Item, ItemDocument } from './schemas/item_schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()

export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) { }

  async create(createItemDto: CreateItemDto) {

    try {

      const { image } = createItemDto

      if (!this.isValidUrl(image)) {
        throw new BadRequestException('The image link is not valid')
      }

      const createdItem = new this.itemModel({ ...createItemDto })

      const savedItem = await createdItem.save()
        .catch(err => {
          console.log(err);
          if (err && err.code == 11000) {
            console.log(err);

            throw new BadRequestException('There is an item with the same name!')
          }
          else throw new InternalServerErrorException('Unexpected error while adding the item')
        })

      return { newItem: savedItem }
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error while adding the item')
    }
  }

  async findAll(query: any): Promise<Object> {
    try {
      // Initialize pagination parameters
      const params = {
        _limit: 3,
        _offset: 0
      }

      // Extract current page from query
      const currentPage = +(query.page) || 1

      // Update limit and offset if provided in query
      if (query.limit) {
        params._limit = +query.limit;
      }

      if (currentPage > 1) {
        params._offset = ((currentPage - 1) * (params._limit)) || 0;
      }

      let foundItemsPromise, totalCount = 0, foundItems
      if (query.type) {
        // Determine search type
        let category = query.keyword;
        if (category && !Object.values(Category).includes(category)) {
          throw new BadRequestException(`Invalid category: ${category}`);
        }
        foundItemsPromise = this.itemModel.find({ category })

      } else foundItemsPromise = this.itemModel.find()


      foundItems = await foundItemsPromise
        .limit(params._limit)
        .skip(params._offset)
        .catch(err => {
          throw new InternalServerErrorException('An unexpected error happened while finding the items!')
        })



      // Get total count of matching documents
      totalCount = await this.itemModel.find({ query }).countDocuments()
        .catch(err => {
          throw new InternalServerErrorException('An unexpected error happened while finding the items count!')
        })

      return { items: foundItems, totalCount: totalCount || 0 } || {};
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')

    }
  }



  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  isValidUrl = urlString => {
    try {
      return Boolean(new URL(urlString));
    }
    catch (e) {
      return false;
    }
  }
}
