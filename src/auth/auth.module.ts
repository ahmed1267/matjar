import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local-strategies';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { PasswordService } from 'src/password/password.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
// import { EmailVerification, EmailVerificationSchema } from './schemas/emailverfication_schema';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    PasswordService,
    JwtStrategy,
    RefreshJwtStrategy,
    // EmailVerification
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  exports: [AuthService, LocalStrategy],

})
export class AuthModule { }
