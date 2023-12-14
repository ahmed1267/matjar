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
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CouponModule } from './coupon/coupon.module';
import { ReportsModule } from './reports/reports.module';
import { ReportsModule } from './reports/reports.module';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ShopModule,
    UserModule,
    ItemModule,
    OrderModule,
    CustomerModule,
    AuthModule,
    CouponModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PassportModule, ReportsService],
})
export class AppModule {}
