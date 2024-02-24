import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoContainerService } from './video-container.service';
import { CreateVideoContainerDto } from './dto/create-video-container.dto';
import { UpdateVideoContainerDto } from './dto/update-video-container.dto';

@Controller('video-container')
export class VideoContainerController {
  constructor(private readonly videoContainerService: VideoContainerService) { }

  @Post()
  create(@Body() createVideoContainerDto: CreateVideoContainerDto) {
    return this.videoContainerService.create(createVideoContainerDto);
  }

  @Get("shop/:id")
  findAll(@Param('id') id: string) {
    return this.videoContainerService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoContainerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoContainerDto: UpdateVideoContainerDto) {
    return this.videoContainerService.update(id, updateVideoContainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoContainerService.remove(id);
  }
}
