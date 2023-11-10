import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schemas/user_schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'hushhush',
      signOptions: { expiresIn: '1h' },
    }),

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
