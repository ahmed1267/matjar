import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order_schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Order.name, schema: OrderSchema
  }]), OrderModule,
  JwtModule.register({
    secret: `${process.env.SECRET}`,
    signOptions: { expiresIn: '1d' },
    global: true,
  }),],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
