import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSliderService } from './product-slider.service';
import { CreateProductSliderDto } from './dto/create-product-slider.dto';
import { UpdateProductSliderDto } from './dto/update-product-slider.dto';

@Controller('product-slider')
export class ProductSliderController {
  constructor(private readonly productSliderService: ProductSliderService) { }

  @Post()
  create(@Body() createProductSliderDto: CreateProductSliderDto) {
    return this.productSliderService.create(createProductSliderDto);
  }

  @Get('shop/:id')
  findAll(@Param('id') id: string) {
    return this.productSliderService.findAll(id);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.productSliderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSliderDto: UpdateProductSliderDto) {
    return this.productSliderService.update(id, updateProductSliderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSliderService.remove(id);
  }
}
