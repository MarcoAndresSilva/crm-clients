import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaz para el documento de Usuario
export interface IUser extends Document {
    username: string;
    email: string;
    password?: string; // Hacemos la contraseña opcional en la interfaz
    comparePassword(password: string): Promise<boolean>;
}


// Schema de Mongoose
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// --- Middleware de Mongoose (pre-save) ---
// Esto se ejecuta ANTES de que un documento de usuario se guarde en la BD.
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {   // Si la contraseña no ha sido modificada, no hacemos nada.
        return next();
    }

    try {   // Si es un usuario nuevo o se está cambiando la contraseña, la hasheamos.
        const salt = await bcrypt.genSalt(10); // Genera una "sal" para el hash
        this.password = await bcrypt.hash(this.password!, salt);
        next();
    } catch (error) {
        next(error as Error);     // Si hay un error, lo pasamos al siguiente middleware
    }
});

// Método personalizado para comparar contraseñas
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


// Creamos y exportamos el modelo
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;