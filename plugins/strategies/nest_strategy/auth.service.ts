import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { ResponseHandler } from './responsehandler';
// import { user } from 'src/users/users.schema';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,private readonly responseHandler: ResponseHandler) {}
  // private userModel: mongoose.Model<user>
  async validateUser(
    username: string, 
    password: string): Promise<any> {
    console.log(username, password);
    if (username === 'pooja' && password === 'pooja@') {
      return { id: 1, username: 'pooja' };
    }
    console.log('Invalid user');
    return null; 
  }
  // async validateUser1(username: string, pass: string): Promise<any> {
  //     /////////inbuilt function //////////////implement that 
  //   const user = await this.userService.findUserByUsername(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  async jwt_generate(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      user,
      access_token: this.jwtService.sign(payload)
    };
  }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook'
    }
    console.log(req.user)
    return {
      message: 'User information from facebook',
      user: req.user
    }
  }
  async validateUserd(username: string, HA1: string): Promise<any> {
    console.log("&&&&&&&&&&&&&&&&&&")
    const users = [
      { username: 'pooja', password: 'pooja@', realm: 'nestjs',HA1: '12345' }
    ];
    const user = users.find(u => u.username === username);

    if (!user) {
      return null;
    }
    if (user.HA1 !== HA1) {
      return null;
    }
    return user;
  }

}
