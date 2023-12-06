import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../schemas/otp-schema';
import { Model } from 'mongoose';

import { faker } from '@faker-js/faker';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private readonly otpModel: Model<Otp>) {}

  private readonly logger = new Logger(OtpService.name);

  async createOtp() {
    try {
      const randOtp = this.generateRandomOtpNumber();

      const otp = await new this.otpModel({ number: randOtp }).save();
      return otp.number;
    } catch (error: any) {
      if (error.code === 1100) {
        throw new InternalServerErrorException(error);
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  private generateRandomOtpNumber() {
    return faker.number.int({ min: 1000, max: 9999 });
  }
}
