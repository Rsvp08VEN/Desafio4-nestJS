import { Schema } from 'mongoose';

export const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], require:true }, // Agregamos roles con valor por defecto
});
