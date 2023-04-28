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
import { ApiTags, ApiResponse, ApiParam, ApiQuery, ApiOperation } from '@nestjs/swagger';


interface RequestWithUser extends ExpressRequest {
  user?: any;
}


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: User })
  async login(@Request() req) {
    console.log('Login request:', req.method, req.url, req.body);
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: User })
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
  @ApiQuery({ name: 'query', required: false, description: 'Search query for users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  async findAll(@Query() query: any): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Update a user', type: User })
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
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Delete a user', type: User })
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