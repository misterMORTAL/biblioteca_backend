
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user with email:', email);
    
    const user = await this.userService.findByEmailAndPassword(email, password);

    console.log('User found:', user);

    if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
}


  async generateToken(user: any): Promise<string> {
    const payload = { sub: user.id, email: user.email, username: user.name, lastname:user.lastname };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async getUserIdFromToken(token: string): Promise<number> {
    const payload: any = this.jwtService.verify(token);
    return payload.sub
  }
}
