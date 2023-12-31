import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCardSliderDto } from './dto/create-card-slider.dto';
import { UpdateCardSliderDto } from './dto/update-card-slider.dto';
import { CardSlider, CardSliderDocument } from './schemas/cardSlider_schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';

@Injectable()
export class CardSliderService {
  constructor(
    @InjectModel(CardSlider.name) private cardSliderModel: Model<CardSliderDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) { }

  async create(createCardSliderDto: CreateCardSliderDto) {
    try {
      const cardSlider = await new this.cardSliderModel(createCardSliderDto).save();
      const shop = await this.shopModel.findById(createCardSliderDto.shop);
      shop.containers.push(cardSlider._id);
      await shop.save();
      return cardSlider;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error while adding the CardSlider',
      );
    }
  }

  async findAll() {
    try {
      const cardSliders = await this.cardSliderModel.find().catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened!');
      })
      return cardSliders;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findOne(id: string) {
    try {
      const cardSlider = await this.cardSliderModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while finding the card slider!');


      });
      return cardSlider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCardSliderDto: UpdateCardSliderDto) {
    try {
      const cardSlider = await this.cardSliderModel.findByIdAndUpdate(id, updateCardSliderDto, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException('An unexpected error happened while updating the card slider!');
      });

      return cardSlider;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const cardSlider = await this.cardSliderModel.findById(id).catch(err => {
      console.log(err);
      throw new InternalServerErrorException('An unexpected error happened while deleting the cardSlider!');
    });
    const shop = await this.shopModel.findById(cardSlider.shop).catch(err => {
      console.log(err);
      throw new InternalServerErrorException('An unexpected error happened while deleting the cardSlider!');

    })
    for (let i = 0; i < shop.containers.length; i++) {
      if (shop.containers[i] === id) {
        shop.containers.splice(i, 1);
        break;
      }
    }
    await shop.save();
    await this.cardSliderModel.findByIdAndDelete(id).catch(err => {
      console.log(err);
      throw new InternalServerErrorException('An unexpected error happened while deleting the cardSlider!');
    })
    return cardSlider;
  }
}
