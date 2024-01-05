import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductSliderDto } from './dto/create-product-slider.dto';
import { UpdateProductSliderDto } from './dto/update-product-slider.dto';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSlider, ProductSliderDocument } from './schemas/productSlider_schema';

@Injectable()
export class ProductSliderService {
  constructor(
    @InjectModel(ProductSlider.name) private productSliderModel: Model<ProductSliderDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) { }

  async create(createProductSliderDto: CreateProductSliderDto) {
    try {
      const productSlider = await new this.productSliderModel(createProductSliderDto).save();
      const shop = await this.shopModel.findById(createProductSliderDto.shop);
      shop.containers.push(productSlider.id);
      await shop.save();
      return productSlider;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error while adding the product Slider',
      );
    }
  }

  async findAll() {
    try {
      const productSlider = await this.productSliderModel.find().catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened!');
      })
      return productSlider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }
  async findOne(id: string) {
    try {
      const productSlider = await this.productSliderModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the product slider!');


      });
      return productSlider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateProductSliderDto: UpdateProductSliderDto) {
    try {
      const productSlider = await this.productSliderModel.findByIdAndUpdate(id, updateProductSliderDto, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while updating the photo slider!');
      });

      return productSlider;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const productSlider = await this.productSliderModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the productSlider!');
      });
      const shop = await this.shopModel.findById(productSlider.shop).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the productSlider!');

      })
      for (let i = 0; i < shop.containers.length; i++) {
        if (shop.containers[i] === id) {
          shop.containers.splice(i, 1);
          break;
        }
      }
      await shop.save();
      await this.productSliderModel.findByIdAndDelete(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while deleting the productSlider!');
      })
      return productSlider;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
