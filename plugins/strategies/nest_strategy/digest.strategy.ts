// // digest-strategy.service.ts

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { DigestStrategy as PassportDigestStrategy } from 'passport-http';
// import { Request } from 'express';
// import * as crypto from 'crypto';

// @Injectable()
// export class DigestStrategy extends PassportStrategy(PassportDigestStrategy, 'digest') {
  
//   constructor(private readonly authService: AuthService) {
//     console.log("authService",authService)
//     super({
//       qop: 'auth',
//       realm: 'nestjs', 
//     });
//   }

//   async validate(
//     username: string,
//     nonce: string,
//     nc: string,
//     cnonce: string,
//     qop: string,
//     response: string,
//     HA1: string,
//     HA2: string,
//     req: Request,
//   ): Promise<any> {
//     const { method, url } = req;
//     console.log("=====:::::::: : : : : : :: : :: :  : : : : ",req)
//     const user = await this.authService.validateUserd(username, HA1);

//     if (!user) {
//       return null;
//     } 
    
//     const HA1Valid = crypto
//       .createHash('md5')
//       .update(`${username}:${user.realm}:${user.password}`)
//       .digest('hex');
//     console.log("============",HA1Valid)
//     const HA2Valid = crypto.createHash('md5').update(`${method}:${url}`).digest('hex');
//     console.log("++++++++++",HA2Valid)
//     const responseValid = crypto
//       .createHash('md5')
//       .update(`${HA1Valid}:${nonce}:${nc}:${cnonce}:${qop}:${HA2Valid}`)
//       .digest('hex');
//     console.log(responseValid)
//     if (response === responseValid) {
//       return user;
//     } else {
//       return null;
//     }
//   }
// }
