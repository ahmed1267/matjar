import { Body, Controller, Post, Request, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    userModel: any;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const user = req.user
        return await this.authService.login(user)
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register')
    async register(@Body() creatUserDto: CreateUserDto) {

        return await this.userService.register(creatUserDto)
    }



    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return this.authService.refreshToken(req.user)
    }
}
