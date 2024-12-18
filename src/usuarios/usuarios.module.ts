import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuarioSchema } from './usuario.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    JwtModule.register({
      secret: 'super-secret-key', // Cambia esto por una clave más segura
      signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService, MongooseModule], // Exportamos MongooseModule
})
export class UsuariosModule {}
