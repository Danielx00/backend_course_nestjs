import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interfaces/user';
import { RegisterUserDto } from './dtos/register-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}
  @Post('/register')
  register(
      @Body() newUser: RegisterUserDto
  ): Promise<RegisterUserResponse> {
      return this.userService.register(newUser);
  }
}
