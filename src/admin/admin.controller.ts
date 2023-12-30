import { Controller, Delete, Get, Patch, Post, Redirect, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('admin')
export class AdminController {

    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true }))
    @Redirect('/user/register')
    async register() { };

    @Post('login')
    @UsePipes(ValidationPipe)
    @Redirect('/auth/login')
    async login() { }

    @Get()
    @Redirect('/user')
    findAll() { }

    @Get('one/:id')
    @Redirect('/user/one/:id')
    findOne() { }

    @Patch()
    @Redirect('/user')
    update() { }

    @Delete(':id')
    @Redirect('/user')
    remove() { }
}
