import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Si no se especificaron roles, la ruta es pública
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false; // Sin token, acceso denegado
    }

    try {
      const user = this.jwtService.verify(token); // Decodificar el token
      request.user = user; // Adjuntar el usuario al request

      // Verificar si los roles del usuario incluyen uno de los roles requeridos
      return requiredRoles.some((role) => user.roles?.includes(role));
    } catch (err) {
      return false; // Token inválido
    }
  }
}
