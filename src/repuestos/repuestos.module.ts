import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosController } from './repuestos.controller';
import { RepuestosService } from './repuestos.service';
import { RepuestoSchema } from './repuesto.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repuesto', schema: RepuestoSchema }]),
    AuthModule,
  ],
  controllers: [RepuestosController],
  providers: [RepuestosService]
})
export class RepuestosModule {}
