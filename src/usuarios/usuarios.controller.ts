import { Controller,Post,Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './create-usuario.dto';


@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService) {}

    // Endpoint para registrar un usuario
    @Post('register')
    async register(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.register(createUsuarioDto);
    }


}