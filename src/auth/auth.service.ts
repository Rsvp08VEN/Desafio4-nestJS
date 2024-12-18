// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(private jwtService: JwtService) {}

//   // Validar credenciales y generar token
//   async validateUser(email: string, password: string): Promise<any> {
//     // Simulación: Verificación estática de usuario
//     if (email === 'test@example.com' && password === '123456') {
//       return { userId: 1, email, roles: ['user'] }; // Usuario con roles
//     }
//     throw new UnauthorizedException('Credenciales incorrectas');
//   }

//   // Generar JWT
//   async login(user: any) {
//     const payload = { email: user.email, sub: user.userId, roles: user.roles };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../usuarios/usuario.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Usuario') private usuarioModel: Model<Usuario>, // Inyectamos el modelo de usuario
  ) {}

  // Validar usuario
  async validateUser(email: string, password: string): Promise<any> {
    // Busca el usuario por correo
    const user = await this.usuarioModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas'); // Usuario no encontrado
    }

    // Comparar la contraseña encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas'); // Contraseña incorrecta
    }

    // Excluir password del resultado
    const { password: _, ...result } = user.toObject();
    return result;
  }

  // Generar token
  async login(user: any) {
    const payload = { email: user.email, sub: user._id, roles: user.roles }; // Incluye roles en el payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

