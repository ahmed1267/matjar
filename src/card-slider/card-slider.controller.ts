import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardSliderService } from './card-slider.service';
import { CreateCardSliderDto } from './dto/create-card-slider.dto';
import { UpdateCardSliderDto } from './dto/update-card-slider.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('card-slider')
export class CardSliderController {
  constructor(private readonly cardSliderService: CardSliderService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCardSliderDto: CreateCardSliderDto) {
    return this.cardSliderService.create(createCardSliderDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.cardSliderService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardSliderService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardSliderDto: UpdateCardSliderDto) {
    return this.cardSliderService.update(id, updateCardSliderDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardSliderService.remove(id);
  }
}
