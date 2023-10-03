import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/type';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('User of password are incorrect!');
  }

  async login(user: IUser) {
    const { id, email } = user;
    const token = this.jwtService.sign({ id, email });
    const expires = new Date(
      this.jwtService.decode(token)?.['exp'] * 1000,
    ).toISOString();
    return {
      user: {
        id,
        email,
      },
      token,
      expires,
    };
  }
}
