import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schemas/user_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from 'src/auth/auth.service';
import { OtpService } from './otp/otp.service';
import { OtpController } from './otp/otp.controller';
import { Otp, OtpSchema } from './schemas/otp-schema';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';
import { Shop, ShopSchema } from 'src/shop/schemas/shop_schema';
import { ShopService } from 'src/user/shop.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
  ],
  controllers: [UserController, OtpController],
  providers: [
    UserService,
    PassportModule,
    AuthService,
    OtpService,
    EmailService,
    ShopService,
  ],
  exports: [UserModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UserModule { }


