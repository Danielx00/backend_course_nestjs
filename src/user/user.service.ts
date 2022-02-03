import { Injectable } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interfaces/user';
import { Like } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async register(newUser: RegisterUserDto): Promise<RegisterUserResponse> {
    const user = new User(); //tworzymy encje
    user.email = newUser.email;
    await user.save();
    return user;
  }
  async getOneUser(id: string): Promise<User> {
    return await User.findOne(id);
  }
}
