// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user:', email);
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log('User validation succeeded:', result);
      return result;
    }
    console.log('User validation failed');
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const { password, ...safeUser } = user; 
    return {
      access_token: this.jwtService.sign(payload),
      user: safeUser,
    };
  }
}
