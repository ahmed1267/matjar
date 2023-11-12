import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument} from './schemas/item_schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()

export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async create(createItemDto: CreateItemDto) {

    try {
      
      const { image }= createItemDto
  
      if(!this.isValidUrl(image)){
        throw new BadRequestException('The image link is not valid')
      }
  
      const createdItem= new this.itemModel({createItemDto})
  
      const savedItem = await createdItem.save()
      .catch(err => {
        console.log(err);
        if (err && err.code == 11000) {
          console.log(err);
  
          throw new BadRequestException('There is an item with the same name!')
        }
        else throw new InternalServerErrorException('Unexpected error while adding the item')
      })
  
      return { savedItem }
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Unexpected error while adding the item')
    }
  }

  findAll() {
    return `This action returns all item`;
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

  isValidUrl = urlString=> {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
}
}
