import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category_schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: mongoose.Model<CategoryDocument>,
    @InjectModel(Shop.name) private readonly shopModel: mongoose.Model<ShopDocument>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto, id: string) {
    try {
      const shop = await this.shopModel.findById(createCategoryDto.shopID).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      })
      if (shop.userID != id) {
        throw new InternalServerErrorException('You are not authorized to create a category for this shop')
      }
      const category = await this.categoryModel.create(createCategoryDto).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      });
      await this.shopModel.findByIdAndUpdate(createCategoryDto.shopID, { $push: { categories: category.id } }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)

      })
      return 'Category created successfully'
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(id: string) {
    try {
      const categories = await this.categoryModel.find({ shopID: id }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      })
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      })
      return category
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      })

      return category
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err)
      })
      return "Category has been deleted successfully"
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
