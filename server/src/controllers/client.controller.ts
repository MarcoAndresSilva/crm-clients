import { type Request, type Response } from 'express';
import ClientModel from '../models/Client-model';

export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await ClientModel.find();
        res.status(200).json(clients);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al obtener los clientes', error: errorMessage });
    }
};  

// TODO // --- Aquí añadiremos las otras funciones del CRUD ---
// export const createClient = async ...
// export const getClientById = async ...
// export const updateClient = async ...
// export const deleteClient = async ...