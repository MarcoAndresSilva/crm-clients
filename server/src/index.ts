import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/database';

import clientRoutes from './routes/client.routes';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';


// Carga las variables de entorno del fichero .env
dotenv.config();

// Conecta a la base de datos
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors()); // --- Middlewares --- Habilita CORS para permitir peticiones desde el frontend de Angular
app.use(express.json()); // Permite al servidor entender JSON en el cuerpo de las peticiones (para POST, PUT, etc.)

// las rutas definidas en 'clientRoutes' estarán bajo el prefijo '/api/clients'.
app.use('/api/clients', clientRoutes);

// las rutas definidas en 'authRoutes' estarán bajo el prefijo '/api/auth'.
app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req: Request, res: Response) => { // --- Ruta de Prueba ---
    res.send('¡API del CRM funcionando correctamente!');
});

app.listen(port, () => { // --- Iniciar el Servidor ---
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${port}`);
});