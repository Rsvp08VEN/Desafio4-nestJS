export interface Usuario {
    id?: string; // MongoDB genera este campo automáticamente
    nombre: string;
    email: string;
    password: string;
    roles: string[];
}
