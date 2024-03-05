import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './auth.service';
import { HttpStatusCode, STATUS_MSG } from './constant';
import { ResponseHandler } from './responsehandler';
import { Response } from 'express';

@Injectable()
export class BasicAuthGuard extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService,private readonly responseHandler:ResponseHandler ) {
    super();
  }
  async validate(@Res() res:Response,username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.responseHandler.sendResponse(
      res,
      HttpStatusCode.Ok,
      true,
      STATUS_MSG.SUCCESS.message,
      user
    );
  }
}
