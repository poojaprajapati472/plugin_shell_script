import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { HttpStatusCode, STATUS_MSG } from './constant';
import { ResponseHandler } from './responsehandler';
@Controller('users')
export class UsersController {
  constructor(public userService: UsersService,private readonly responseHandler: ResponseHandler,) {}

  @Post('/signup')
  async signup(
    @Res() res: Response,
    @Body() user_details: CreateUserDto) {
    try{
    //your code 
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      // newUser
    );
    }catch (error) {
      return await this.responseHandler.sendErrorResponse(
        res,
        HttpStatusCode.BadRequest,
        error?.message,
        error?.errors,
      );
    }
  }


  @Post('/login')
  async login(
    @Res() res: Response,
    @Body()user:LoginDto)
     {
    try{
      //your code here 
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      // details
    );
  } catch (error) {
    return await this.responseHandler.sendErrorResponse(
      res,
      HttpStatusCode.BadRequest,
      error?.message,
      error?.errors,
    );
  }
  }
}         
interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}
interface LoginDto {
  username: string;
  password: string;
}
