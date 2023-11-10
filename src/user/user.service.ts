import { BadRequestException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user_schema';
import * as bcrypt from 'bcrypt';
import { PasswordService } from 'src/password/password.service';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private passwordService: PasswordService
  ) { }
  async register(createUserDto: CreateUserDto) {
    try {

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });


      const savedUser = await createdUser.save()
        .catch(err => {
          console.log(err);
          if (err && err.code == 11000) throw new BadRequestException('This username already exisits!')
          else throw new InternalServerErrorException('Unexpected error while creating the user')
        })


      const token = this.generateToken(savedUser, { expiresIn: '1d' });
      const userResponse = { ...savedUser.toObject(), password: undefined };

      return { token, user: userResponse };

    } catch (error) {
      if (error instanceof HttpException) throw error
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!')
    }
  }


  async signIn(username: string, password: string) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user, { expiresIn: '1d' });
    return { token };
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private generateToken(user: UserDocument, options?: any): string {

    const payload = { sub: user._id, username: user.username };
    return this.jwtService.sign(payload, options);
  }
}
