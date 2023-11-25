import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user_schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const foundUser = await this.userModel.findOne({ email });
      if (foundUser) {
        throw new UnauthorizedException('There is a user with the same email!');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await createdUser.save().catch((err) => {
        console.log(err);
        if (err && err.code == 11000) {
          console.log(err);

          throw new BadRequestException(
            'There is a user with the same phone number!',
          );
        } else
          throw new InternalServerErrorException(
            'Unexpected error while creating the user',
          );
      });

      const token = this.generateToken(savedUser);
      const userResponse = { ...savedUser.toObject(), password: undefined };

      return { token, user: userResponse };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findAll(query) {
    try {
      const params = {
        _limit: 3,
        _offset: 0,
      };
      const currentPage = +query.page || 1;

      if (query.limit) {
        params._limit = +query.limit;
      }

      if (currentPage > 1) {
        params._offset = (currentPage - 1) * params._limit || 0;
      }
      const foundUsers = await this.userModel
        .find()
        .limit(params._limit)
        .skip(params._offset)
        .catch((err) => {
          console.log(err);
          throw new InternalServerErrorException(
            'Unexpected error while returning user list',
          );
        });
      for (const user of foundUsers) {
        user.password = undefined;
      }

      return { foundUsers };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findOne(id: string) {
    try {
      const idValid = mongoose.isValidObjectId(id);
      if (!idValid) throw new BadRequestException('Please enter correct Id');
      const foundUser = await this.userModel.findById(id).catch((err) => {
        console.log(err);
        throw new NotFoundException('This user doesnt exist');
      });
      foundUser.password = undefined;
      return foundUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async findOneWithEmail(email: string) {
    return await this.userModel
      .findOne({ email })
      .lean()
      .exec()
      .catch((err) => {
        console.log(err);
        throw new NotFoundException('This user doesnt exist');
      });
  }
  async update(updateUserDto: UpdateUserDto) {
    try {
      const { currentId, updateId, ...data } = updateUserDto;
      const user = await this.userModel.findById(currentId).catch((err) => {
        console.log(err);
        throw new NotFoundException('This user doesnt exist');
      });

      if (updateId === currentId || user.role == 'admin') {
        const updatedUser = await this.userModel
          .findByIdAndUpdate(updateId, data, { new: true })
          .catch((err) => {
            console.log(err);
            throw new InternalServerErrorException(
              'Unexpected error while updating user',
            );
          });
        updatedUser.password = undefined;
        return updatedUser;
      } else {
        throw new UnauthorizedException('Unathorized error');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }

  async remove(userId: string, deleteId: string) {
    try {
      const user = await this.userModel.findById(userId).catch((err) => {
        console.log(err);
        throw new NotFoundException('This user doesnt exist');
      });
      if (!user) throw new NotFoundException('This user doesnt exist');
      if (user.role == 'admin' || userId == deleteId) {
        const deletedUser = this.userModel
          .findByIdAndDelete(deleteId)
          .catch((err) => {
            console.log(err);
            throw new InternalServerErrorException(
              'Unexpected error while deleting user',
            );
          });
        if (!deletedUser) {
          throw new NotFoundException('User to delete not found');
        }
        return 'User Deleted Successfully';
      } else
        throw new UnauthorizedException(
          'You dont have the permission to delete this user',
        );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An unexpected error happened while deleting the user',
      );
    }
  }

  private generateToken(user: UserDocument): string {
    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload, { secret: process.env.SECRET });
  }
}
