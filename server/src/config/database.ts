// src/config/database.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
        console.error('Error: MONGO_URI no está definida en el fichero .env');
        process.exit(1); // Detiene la aplicación si no hay cadena de conexión
        }

        await mongoose.connect(mongoURI);
        console.log('✅[database]: Conexión a MongoDB exitosa.');
    } catch (error) {
        console.error('❌[database]: Error al conectar a MongoDB:', error);
        process.exit(1); // Detiene la aplicación si la conexión falla
    }
};

export default connectDB;
