import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserModule,
  JwtModule.register({
    secret: `${process.env.SECRET}`,
    signOptions: { expiresIn: '1d' },
    global: true,
  }),],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
