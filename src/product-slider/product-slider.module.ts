import { Module } from '@nestjs/common';
import { ProductSliderService } from './product-slider.service';
import { ProductSliderController } from './product-slider.controller';
import { ProductSlider, ProductSliderSchema } from './schemas/productSlider_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { ShopModule } from 'src/shop/shop.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ProductSlider.name, schema: ProductSliderSchema },
    { name: Shop.name, schema: ShopSchema },]), ShopModule
    , JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),],
  controllers: [ProductSliderController],
  providers: [ProductSliderService],
})
export class ProductSliderModule { }
