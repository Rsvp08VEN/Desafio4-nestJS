import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosController } from './repuestos.controller';
import { RepuestosService } from './repuestos.service';
import { RepuestoSchema } from './repuesto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repuesto', schema: RepuestoSchema }]),
  ],
  controllers: [RepuestosController],
  providers: [RepuestosService]
})
export class RepuestosModule {}
