
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: '154293596740101-5m0bieevkf4dimkembdr4p30f3crqk38.apps.googleusercontent.com',
      clientSecret: 'GOCSPXgfh-Q4vUvP0NdjK2lKLEj3i10Yr-2821',
      callbackURL: 'http://localhost:3000/users/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    done(null, user);
  }
}