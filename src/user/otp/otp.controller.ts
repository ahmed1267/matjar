import { Controller, Get, Post, Query } from '@nestjs/common';
import { OtpService } from './otp.service';
import { EmailService } from '../email/email.service';

@Controller('user/otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  generate() {
    return this.otpService.createOtp();
  }

  @Post('email')
  async sendEmail(@Query('to') to: string, @Query('name') name: string) {
    return this.emailService.emailOTPCode(to, name);
  }
}
