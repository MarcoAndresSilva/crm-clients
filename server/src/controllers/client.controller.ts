import { type Request, type Response } from 'express';
import ClientModel from '../models/Client-model';

// @desc    Obtener todos los clientes
// @route   GET /api/clients
// @access  Public
export const getClients = async (req: Request, res: Response) => { 
    try {
        const clients = await ClientModel.find();
        res.status(200).json(clients);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al obtener los clientes', error: errorMessage });
    }
};  

// @desc    Crear un nuevo cliente
// @route   POST /api/clients
// @access  Public
export const createClient = async (req: Request, res: Response) => {
    try {
            const {name, company, email, phone} = req.body; // extrae los datos del cuerpo de la solicitud
            if(!name || !company || !email || !phone) { 
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }
            const newClient = new ClientModel({name, company, email, phone}); // crea una nueva instancia del modelo cliente
            const savedClient = await newClient.save(); // guarda el nuevo cliente en la base de datos
            res.status(201).json(savedClient);
    } catch (error) {
        if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' }); // 409 Conflict
            }
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ message: 'Error al crear el cliente', error: errorMessage });
    }
}

// TODO // --- Aquí añadiremos las otras funciones del CRUD ---
// export const getClientById = async ...
// export const updateClient = async ...
// export const deleteClient = async ...