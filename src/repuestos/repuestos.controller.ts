import { Controller,Get,Post,Put,Delete,Body,Param,UseGuards} from '@nestjs/common';
import { RepuestosService } from './repuestos.service';
import { CreateRepuestoDto } from './create-repuesto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
@Controller('repuestos')
export class RepuestosController {
    constructor(private readonly repuestosService: RepuestosService) {}
    
    // Endpoint para crear un repuesto
    @UseGuards(AuthGuard, RolesGuard) // Combina ambos guardias
    @Roles('admin') // Requiere rol de admin
    @Post()
        async crear(@Body() createRepuestoDto: CreateRepuestoDto) {
        return this.repuestosService.crear(createRepuestoDto);
    }

    // Endpoint para obtener todos los repuestos
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user') // Requiere rol de usuario
    @Get()
        async solicitarTodos() {
        return this.repuestosService.solicitarTodos();
    }

    // Endpoint para obtener un repuesto por ID
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('user') // Requiere rol de usuario
    @Get(':id')
        async solicitarUno(@Param('id') id: string) {
        return this.repuestosService.solicitarUno(id);
    }

    // Actualizar un repuesto por ID
    @UseGuards(AuthGuard, RolesGuard) // Combina ambos guardias
    @Roles('admin') // Requiere rol de admin
    @Put(':id')
        async actualizar(@Param('id') id: string, @Body() updateRepuestoDto: Partial<CreateRepuestoDto>) {
        return this.repuestosService.actualizar(id, updateRepuestoDto);
    }

    // Eliminar un repuesto por ID
    @UseGuards(AuthGuard, RolesGuard) // Combina ambos guardias
    @Roles('admin') // Requiere rol de admin
    @Delete(':id')
        async eliminar(@Param('id') id: string) {
        return this.repuestosService.eliminar(id);
    } 
}
