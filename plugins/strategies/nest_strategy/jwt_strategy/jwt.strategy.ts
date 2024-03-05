import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configservice.get<string>('SECRET_KEY'),
      secretOrKey:"pooja"
    });
  }
  async validate(payload: any) {
    return {
      _id: payload.sub,
      username: payload.username,
    };
  }
}
