import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(JwtGuard)
  @Get()
  @Redirect('/user')
  findAll() { }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.update(updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') userId: string, @Body('id') deleteId: string) {
    return this.adminService.remove(userId, deleteId);
  }
}
