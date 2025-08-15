// src/routes/client.routes.ts
import { Router } from 'express';
import { getClients, createClient, getClientById, updateClient, deleteClient } from '../controllers/client.controller';

const router = Router();

// Definimos la ruta y le asignamos el controlador
router.route('/')
    .get(getClients)
    .post(createClient);

// Rutas para un cliente específico por ID
router.route('/:id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);


export default router;