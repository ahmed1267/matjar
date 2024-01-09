import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user_schema';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
