import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schemas/user_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from 'src/password/password.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
// import { EmailVerification } from 'src/auth/schemas/emailverfication_schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,

  ],
  controllers: [UserController],
  providers: [UserService, PasswordService, PassportModule, AuthService,
    // EmailVerification
  ],
})
export class UserModule { }
