import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { PasswordService } from './password/password.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI),
    ShopModule, UserModule, ItemModule, OrderModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService, PasswordService],
})
export class AppModule { }