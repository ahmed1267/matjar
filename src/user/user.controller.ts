import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Redirect,
  Request,
  UseGuards
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from './email/email.service';
import { User } from './schemas/user_schema';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private readonly emailService: EmailService,
  ) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    await this.emailService.emailOTPCode(
      createUserDto.email,
      createUserDto.name,
    );
    return this.userService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Request() req) {
    const user = req.user
    return await this.authService.login(user)
  }

  @Get()
  findAll(@Param('page') page: number) {
    return this.userService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Patch('/checkout/:id')
  checkout(@Param('id') id: string, @Body('sellerID') sellerID: string, @Body('shop') shop: string) {
    return this.userService.checkOut(id, sellerID, shop);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') userId: string, @Body('id') deleteId: string) {
    return this.userService.remove(userId, deleteId);
  }
}
