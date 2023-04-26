// src/user/user.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('Login request:', req.method, req.url, req.body);
    return this.authService.login(req.user);
  }

//   @Post('test-local-strategy')
//   async testLocalStrategy(@Body() body: any) {
//   console.log('Test LocalStrategy request:', body);
//   const user = await this.authService.validateUser(body.email, body.password);
//   return { user };
// }

  @Post('signup')
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
