// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';

// @Module({
//   controllers: [AuthController],
//   providers: [AuthService]
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', // Clave secreta, usar variables de entorno en producción
      signOptions: { expiresIn: '1h' }, // Token expira en 1 hora
    }),
    UsuariosModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
