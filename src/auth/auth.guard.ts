import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * AuthClass to handle Jwt Implementation
 */
@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {}
