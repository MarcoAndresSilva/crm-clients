// src/routes/client.routes.ts
import { Router } from 'express';
import { getClients, createClient} from '../controllers/client.controller';

const router = Router();

// Definimos la ruta y le asignamos el controlador
router.get('/', getClients);
router.post('/', createClient);
// --- Aquí añadiremos las otras rutas del CRUD ---
// router.get('/:id', getClientById);
// router.put('/:id', updateClient);
// router.delete('/:id', deleteClient);

export default router;