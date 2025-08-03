// src/models/Client.model.ts
import { Schema, model, Document } from 'mongoose';

// Interfaz que define las propiedades del documento (para TypeScript)
export interface IClient extends Document {
    name: string;
    company: string;
    email: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema que define la estructura en MongoDB
const ClientSchema = new Schema<IClient>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // No puede haber dos clientes con el mismo email
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    }, {
    // Opciones del Schema
    timestamps: true, // Añade automáticamente los campos createdAt y updatedAt
    versionKey: false // No añade el campo __v de versión
    });

// Creamos y exportamos el modelo
// Mongoose creará una colección llamada 'clients' (plural y en minúsculas)
const ClientModel = model<IClient>('Client', ClientSchema);

export default ClientModel;