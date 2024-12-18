/* eslint-disable prettier/prettier */
import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repuesto } from './repuesto.interface';
import { CreateRepuestoDto } from './create-repuesto.dto';

@Injectable()
export class RepuestosService {
  constructor(@InjectModel('Repuesto') private readonly repuestoModel: Model<Repuesto>,) {}

    // Crear un nuevo repuesto
  async crear(createRepuestoDto: CreateRepuestoDto): Promise<Repuesto> {
    const nuevoRepuesto = new this.repuestoModel(createRepuestoDto);
    return nuevoRepuesto.save();
  }

  // Obtener todos los repuestos
  async solicitarTodos(): Promise<Repuesto[]> {
    return this.repuestoModel.find().exec();
  }

  // Obtener un repuesto por ID
  async solicitarUno(id: string): Promise<Repuesto> {
    return this.repuestoModel.findById(id).exec();
  }

    // Actualizar un repuesto por ID
    async actualizar(id: string, updateRepuestoDto: Partial<CreateRepuestoDto>): Promise<Repuesto> {
      return this.repuestoModel.findByIdAndUpdate(id, updateRepuestoDto, { new: true }).exec();
    }
  
    // Eliminar un repuesto por ID
    async eliminar(id: string): Promise<Repuesto> {
      return this.repuestoModel.findByIdAndDelete(id).exec();
    }
}

