const express = require('express');
import type { Express, Request, Response } from 'express'; // Los tipos se mantienen
const cors = require('cors');
const dotenv = require('dotenv');

// Carga las variables de entorno del fichero .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors()); // --- Middlewares --- Habilita CORS para permitir peticiones desde el frontend de Angular
app.use(express.json()); // Permite al servidor entender JSON en el cuerpo de las peticiones (para POST, PUT, etc.)

app.get('/', (req: Request, res: Response) => { // --- Ruta de Prueba ---
    res.send('¡Hola desde el servidor Express con TypeScript!');
});

app.listen(port, () => { // --- Iniciar el Servidor ---
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${port}`);
});