import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhotoSliderService } from './photo-slider.service';
import { CreatePhotoSliderDto } from './dto/create-photo-slider.dto';
import { UpdatePhotoSliderDto } from './dto/update-photo-slider.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('photo-slider')
export class PhotoSliderController {
  constructor(private readonly photoSliderService: PhotoSliderService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPhotoSliderDto: CreatePhotoSliderDto) {
    return this.photoSliderService.create(createPhotoSliderDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.photoSliderService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoSliderService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoSliderDto: UpdatePhotoSliderDto) {
    return this.photoSliderService.update(id, updatePhotoSliderDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoSliderService.remove(id);
  }
}
