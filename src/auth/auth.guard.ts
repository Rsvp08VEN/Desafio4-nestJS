// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization?.split(' ')[1]; // Extrae el token

//     if (!token) return false;

//     try {
//       const decoded = this.jwtService.verify(token);
//       request.user = decoded; // Adjunta el usuario decodificado al request
//       return true;
//     } catch (err) {
//       return false; // Token inválido
//     }
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.error('⚠️ No Authorization header found');
      return false;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('⚠️ No token found in Authorization header');
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token); // Verifica el token
      console.log('✅ Token validado:', decoded); // Añade un log
      request.user = decoded; // Asocia el usuario al request
      return true;
    } catch (err) {
      console.error('❌ Error al verificar el token:', err.message);
      return false;
    }
  }
}
