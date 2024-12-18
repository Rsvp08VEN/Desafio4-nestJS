import { Controller,Get,Post,Put,Delete,Body,Param } from '@nestjs/common';
import { RepuestosService } from './repuestos.service';
import { CreateRepuestoDto } from './create-repuesto.dto';

@Controller('repuestos')
export class RepuestosController {
    constructor(private readonly repuestosService: RepuestosService) {}
    
    // Endpoint para crear un repuesto
    @Post()
        async crear(@Body() createRepuestoDto: CreateRepuestoDto) {
        return this.repuestosService.crear(createRepuestoDto);
    }

    // Endpoint para obtener todos los repuestos
    @Get()
        async solicitarTodos() {
        return this.repuestosService.solicitarTodos();
    }

    // Endpoint para obtener un repuesto por ID
    @Get(':id')
        async solicitarUno(@Param('id') id: string) {
        return this.repuestosService.solicitarUno(id);
    }

    // Actualizar un repuesto por ID
    @Put(':id')
        async actualizar(@Param('id') id: string, @Body() updateRepuestoDto: Partial<CreateRepuestoDto>) {
        return this.repuestosService.actualizar(id, updateRepuestoDto);
    }

    // Eliminar un repuesto por ID
    @Delete(':id')
        async eliminar(@Param('id') id: string) {
        return this.repuestosService.eliminar(id);
    } 
}
