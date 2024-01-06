import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductSliderService } from './product-slider.service';
import { CreateProductSliderDto } from './dto/create-product-slider.dto';
import { UpdateProductSliderDto } from './dto/update-product-slider.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('product-slider')
export class ProductSliderController {
  constructor(private readonly productSliderService: ProductSliderService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createProductSliderDto: CreateProductSliderDto) {
    return this.productSliderService.create(createProductSliderDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.productSliderService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSliderService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSliderDto: UpdateProductSliderDto) {
    return this.productSliderService.update(id, updateProductSliderDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSliderService.remove(id);
  }
}
