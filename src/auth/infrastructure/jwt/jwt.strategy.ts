import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { IUsersService } from 'src/users/application/users.service.interface';
import { User } from 'src/users/domain/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly usersService: IUsersService,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }


  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user: User = await this.usersService.findById(id);

    if (!user) throw new UnauthorizedException();

    return user;
  }

}
