// src/server/src/index.ts

const express = require('express');
import type { Express, Request, Response } from 'express'; // Los tipos se mantienen
const cors = require('cors');
const dotenv = require('dotenv');

// Carga las variables de entorno del fichero .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// El resto del código es idéntico...
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola desde el servidor Express con TypeScript!');
});

app.listen(port, () => {
    console.log(`⚡️[servidor]: El servidor está corriendo en http://localhost:${port}`);
});