import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local-strategies';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user_schema';

import { PassportModule } from '@nestjs/passport';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';




@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,

  ],
  exports: [AuthService, LocalStrategy],
})
export class AuthModule { }

