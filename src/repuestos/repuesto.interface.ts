export interface Repuesto {
    id?: string; // MongoDB asignará este campo automáticamente
    nombre: string;
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    foto: string;
}
