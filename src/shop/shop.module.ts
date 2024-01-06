import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop_schema';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Shop.name, schema: ShopSchema
  }]), ShopModule,
  JwtModule.register({
    secret: `${process.env.SECRET}`,
    signOptions: { expiresIn: '1d' },
    global: true,
  }),],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopModule, MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),]
})
export class ShopModule { }
