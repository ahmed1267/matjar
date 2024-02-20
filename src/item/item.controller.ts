import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get('all-items/:shop/:page')
  findAll(
    @Param('page') page: number,
    @Param('shop') shopID: string,
    @Query('category') category: string,
    @Query('subCategorey') subCategorey: string,
    @Query('sortOrder') sortOrder: string,
  ) {

    return this.itemService.findAll(page, shopID, category, subCategorey, sortOrder);
  }

  @Get('one-item/:id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }

}
