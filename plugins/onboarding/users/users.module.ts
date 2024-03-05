// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResponseHandler } from './responsehandler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    ResponseHandler
  ],
})
export class UsersModule {
  constructor() {
    console.log('This is user module');
  }
}
