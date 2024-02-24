import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVideoContainerDto } from './dto/create-video-container.dto';
import { UpdateVideoContainerDto } from './dto/update-video-container.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/shop/schemas/shop_schema';
import { VideoContainer, VideoContainerDocument } from './schemas/videoContainer-schema';

@Injectable()
export class VideoContainerService {
  constructor(
    @InjectModel(VideoContainer.name) private videoContainerModel: Model<VideoContainerDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) { }


  async create(createVideoContainerDto: CreateVideoContainerDto) {
    try {
      const videoContainer = await new this.videoContainerModel(createVideoContainerDto).save();
      const shop = await this.shopModel.findById(createVideoContainerDto.shop);
      shop.containers.push({ containerID: videoContainer.id, containerType: 'video container' });
      await shop.save();
      return videoContainer;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(id: string) {
    try {
      const videoContainer = await this.videoContainerModel.find({ shop: id }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      })
      return videoContainer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }


  async findOne(id: string) {
    try {
      const videoContainer = await this.videoContainerModel.findById(id).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);


      });
      return videoContainer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateVideoContainerDto: UpdateVideoContainerDto) {
    try {
      const videoContainer = await this.videoContainerModel.findByIdAndUpdate(id, updateVideoContainerDto, {
        new: true,
      }).catch(err => {
        console.log(err);
        throw new InternalServerErrorException(err);
      });

      return videoContainer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    const videoContainer = await this.videoContainerModel.findById(id).catch(err => {
      console.log(err);
      throw new InternalServerErrorException(err);
    });
    if (!videoContainer) throw new InternalServerErrorException("this slider doesn't exist")

    const shop = await this.shopModel.findById(videoContainer.shop).catch(err => {
      console.log(err);
      throw new InternalServerErrorException(err);

    })
    for (let i = 0; i < shop.containers.length; i++) {
      if (shop.containers[i].containerID === id) {
        shop.containers.splice(i, 1);
        break;
      }
    }
    await shop.save();
    await this.videoContainerModel.findByIdAndDelete(id).catch(err => {
      console.log(err);
      throw new InternalServerErrorException(err);
    })
    return 'Video Container deleted successfully';
  }
}
