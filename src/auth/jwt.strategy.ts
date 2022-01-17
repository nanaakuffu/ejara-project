import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // set the default username field for the auth
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Decide where to look for the token in the request object
      secretOrKey: process.env.JWT_SECRET, // A place for the jwt secret key loaded from the .env file
    });
  }

  /**
   * Implementing an interface method within the Passpowrt strategy
   * @param payload
   * @returns currentUser
   */
  async validate(payload: {
    user_id: number;
    user_email: string;
  }): Promise<any> {
    // Validate logged in user
    const user = await this.authService.validateUser(payload);

    // Throw error if user not validated
    if (!user) {
      throw new UnauthorizedException();
    }

    // Return logged in user
    return user;
  }
}
