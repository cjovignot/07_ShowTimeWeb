// src/auth/local.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('Validating user (LocalStrategy):', email);
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      console.log('User not found (LocalStrategy)');
      throw new UnauthorizedException();
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Password invalid (LocalStrategy)');
      throw new UnauthorizedException();
    }
  
    console.log('User validation succeeded (LocalStrategy):', user);
    return user;
  }
}
