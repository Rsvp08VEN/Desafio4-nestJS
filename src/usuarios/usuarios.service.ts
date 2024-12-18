import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.interface';
import { CreateUsuarioDto } from './create-usuario.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
        private readonly jwtService: JwtService,
    ) {}

    // // Registrar un nuevo usuario
    // async register(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    //     // Verificar si el usuario ya existe
    //     const usuarioExistente = await this.usuarioModel.findOne({ email: createUsuarioDto.email }).exec();
    //     if (usuarioExistente) {
    //         throw new Error('El usuario con este correo ya está registrado.');
    //     }

    //     // Encriptar la contraseña
    //     const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    //     const nuevoUsuario = new this.usuarioModel({
    //         ...createUsuarioDto,
    //         password: hashedPassword,
    //     });
    //     return nuevoUsuario.save();
    // }
// Registrar un nuevo usuario
async register(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si el usuario ya existe
    const usuarioExistente = await this.usuarioModel.findOne({ email: createUsuarioDto.email }).exec();
    if (usuarioExistente) {
        throw new Error('El usuario con este correo ya está registrado.');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

    // Crear un nuevo usuario con los datos del DTO, incluyendo roles
    const nuevoUsuario = new this.usuarioModel({
        ...createUsuarioDto, // Incluye nombre, email, password, roles
        password: hashedPassword, // Sobrescribe la contraseña con la versión encriptada
    });

    return nuevoUsuario.save();
}

}

