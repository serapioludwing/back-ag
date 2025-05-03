// src/modules/user/user.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './../../application/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
  ) {
    const { username, password } = body;
    return this.userService.register(username, password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { username: string; password: string },
  ) {
    const { username, password } = body;
    const result = await this.userService.validateUser(username, password);
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    return result; // returns { accessToken }
  }
}
