import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Category } from './schemas/item-schema';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @UseGuards(JwtGuard)
  @Get(':page/:user')
  findAll(
    @Param('page') page: number,
    @Param('user') userId: string,
    @Query('category') category: Category,
  ) {
    return this.itemService.findAll(page, userId, category);
  }

  @UseGuards(JwtGuard)
  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
