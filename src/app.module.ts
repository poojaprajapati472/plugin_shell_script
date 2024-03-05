
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { ResponseHandler } from './nest_strategy/responsehandler';
import { FacebookStrategy } from './nest_strategy/facebook.strategy';
import { GoogleStrategy } from './nest_strategy/google.strategy';
import { JwtStrategy } from './nest_strategy/jwt_strategy/jwt.strategy';
import { LocalStrategy } from './nest_strategy/local.strategy';
import { BasicAuthGuard } from './nest_strategy/auth.strategy';
import { AuthService } from './nest_strategy/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule,AuthModule,UsersModule],
  controllers: [AppController],
  providers: [
    ResponseHandler,
    FacebookStrategy,
    GoogleStrategy,
    JwtStrategy,
    LocalStrategy,
    BasicAuthGuard,
    AuthService,
    JwtService,
   AppService,ConfigService],
})
export class AppModule {}
