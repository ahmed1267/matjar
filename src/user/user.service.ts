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

      const { email } = createUserDto;
      const foundUser = await this.userModel.findOne({ email })
      if (foundUser) {
        throw new UnauthorizedException('There is a user with the same email!');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });


      const savedUser = await createdUser.save()
        .catch(err => {
          console.log(err);
          if (err && err.code == 11000) {
            console.log(err);

            throw new BadRequestException('This email or phone number already exisits!')
          }
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


  async signIn(email: string, password: string) {
    const user = await this.userModel.findOne({ email })
      .catch(err => {
        console.log(err);
        if (err && err.code == 404) {
          console.log(err);

          throw new BadRequestException('This email doesnt exist!')
        }
        else throw new InternalServerErrorException('Unexpected error while logging in')
      })
    if (!user) {
      throw new UnauthorizedException('This email doesnt exist!')
    }

    const isPasswordValid = await this.passwordService.comparePasswords(password, user.password)
      .catch(err => {
        console.log(err);
        throw new InternalServerErrorException('Unexpected error while logging in')
      });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password!');
    }

    const userResponse = { ...user.toObject(), password: undefined };

    const token = this.generateToken(user, { expiresIn: '1d' });
    return { token, userResponse };
  }


  async findAll() {
    const foundUsers= await this.findAll()
    .catch(err => {
      console.log(err);
      throw new InternalServerErrorException('Unexpected error while logging in')
    });

    return foundUsers
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

    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload, options);
  }
}
