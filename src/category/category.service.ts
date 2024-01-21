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
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while creating the category!')
      });
      await this.shopModel.findByIdAndUpdate(createCategoryDto.shopID, { $push: { categories: category.id } })
      return 'Category created successfully'
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while creating the category!');
    }
  }

  async findAll(id: string) {
    try {
      const categories = await this.categoryModel.find({ shopID: id }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the categories!')
      })
      return categories;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while finding the categories!');
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the category!')
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while finding the category!');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while updating the category!')
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while updating the category!');
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the category!')
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened while deleting the category!');
    }
  }
}
