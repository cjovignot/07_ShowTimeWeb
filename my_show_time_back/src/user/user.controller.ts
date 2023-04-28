// src/user/user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  @Post('signup')
  async create(@Body() user: User): Promise<any> {
    try {
      const newUser = await this.userService.create(user);
      return {
        message: 'User successfully created',
        data: newUser,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      } else if (error.name === 'ValidationError') {
        if (error.errors.password && error.errors.password.kind === 'minlength') {
          throw new HttpException(
            'Password must contain at least one number and one uppercase letter',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  async findAll(@Query() query: any): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<any> {
    try {
      const updatedUser = await this.userService.update(id, user);
      return {
        message: 'User successfully updated',
        data: updatedUser,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      } else if (error.name === 'ValidationError') {
        if (error.errors.password && error.errors.password.kind === 'minlength') {
          throw new HttpException(
            'Password must contain at least one number and one uppercase letter',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      const deletedUser = await this.userService.delete(id);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      return {
        message: 'User successfully deleted',
        data: deletedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}