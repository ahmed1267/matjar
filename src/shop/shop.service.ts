import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from './schemas/shop_schema';
import * as mongoose from 'mongoose';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name)
    private ShopModel: mongoose.Model<Shop>,
  ) { }

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  findAll() {
    return `This action returns all shop`;
  }

  // Find a Shop by its ID
  async findOne(id: string): Promise<Shop> {
    try {
      const idValid = mongoose.isValidObjectId(id)
      if (!idValid) throw new BadRequestException('Please enter correct Id')

      const foundShop = await (await this.ShopModel.findById(id)).populate('items','name')

      if (!foundShop) throw new NotFoundException('There is no shop with this id')

      return foundShop

    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    }
  }


  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
