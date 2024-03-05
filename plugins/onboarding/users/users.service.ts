import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}
  async createUser(user_details: CreateUserDto) {
    //write your code here 
  }
  async findUserByUsername(username: string) {
     // Use findOne to query for a user by username
  }
}
interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}
