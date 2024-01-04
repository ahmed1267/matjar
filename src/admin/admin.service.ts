import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User, UserDocument } from 'src/user/schemas/user_schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }
  async findOne(id: string) {
    try {
      var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")
      const idValid = checkForHexRegExp.test(id);
      if (!idValid) throw new BadRequestException('Please enter correct Id');
      const foundUser = await this.userModel.findById(id).catch((err) => {
        console.log(err);
        throw new NotFoundException('An unexpected error happened while finding the user!');
      });
      if (!foundUser) throw new NotFoundException('This user doesnt exist');
      foundUser.password = undefined;
      return foundUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error happened!');
    }
  }


  async update(updateUserDto: UpdateUserDto) {
    try {
      const { currentId, updateId, ...data } = updateUserDto;
      const user = await this.userModel.findById(currentId).catch((err) => {
        console.log(err);
        throw new NotFoundException('This user doesnt exist');
      });

      if (updateId === currentId || user.role === 'admin') {
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
}
