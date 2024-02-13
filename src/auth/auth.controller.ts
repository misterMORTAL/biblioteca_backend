
import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from 'src/users/dto/reset-password-dto';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ token: string }> {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    const token = await this.authService.generateToken(user);

    return { token };
  }
 
  @Post('send-reset-email')
  async sendResetEmail(@Body() body: { email: string }): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      await this.userService.sendResetEmail(user);
    }
    // Puedes manejar el caso en que el usuario no existe de alguna manera
    // Por ejemplo: throw new NotFoundException('Usuario no encontrado');
  }

  @Post('reset-password')
  async resetPassword(@Body() resetData: ResetPasswordDto): Promise<void> {
    await this.userService.resetPassword(resetData.token, resetData.newPassword);
  }

  //obtiene la informacion del usuario registrado
  @Get('user-info')
  async getUserInfo(@Headers('authorization') authHeader: string): Promise<any> {
    const token = authHeader.replace('Bearer ', '');
    const userId = await this.authService.getUserIdFromToken(token);
    const user = await this.userService.findOne(userId); // Obtener la información del usuario utilizando el ID del token
    return user;
  }
  
  
}