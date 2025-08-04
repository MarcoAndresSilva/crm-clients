import { type Request, type Response } from 'express';
import ClientModel from '../models/Client-model';

// @desc    Obtener todos los clientes - @route   GET /api/clients - @access  Public
export const getClients = async (req: Request, res: Response) => { 
    try {
        const clients = await ClientModel.find();
        res.status(200).json(clients);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al obtener los clientes', error: errorMessage });
    }
};  

// @desc    Crear un nuevo cliente - @route   POST /api/clients - @access  Public
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
};

// @desc    Obtener un cliente por su ID - @route   GET /api/clients/:id - @access  Public
export const getClientById = async (req: Request, res: Response) => {
    try {
        const client = await ClientModel.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(client);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al obtener el cliente', error: errorMessage });
    }
};

// @desc    Actualizar un cliente por su ID - @route   PUT /api/clients/:id - @access  Public
export const updateClient = async (req: Request, res: Response) => {
    try {
        const { name, company, email, phone } = req.body;
        const clientId = req.params.id;

        const updatedClient = await ClientModel.findByIdAndUpdate(  // Buscamos el cliente y lo actualizamos en un solo paso { new: true } hace que Mongoose devuelva el documento actualizado, no el original
            clientId, 
            { name, company, email, phone },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
        }

        res.status(200).json(updatedClient);
    } catch (error) {
        if(error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return res.status(409).json({ message: 'El correo electrónico ya esta registrado.' });
        }
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al actualizar el cliente', error: errorMessage });
    }
};

// @desc    Eliminar un cliente por su ID - @route   DELETE /api/clients/:id - @access  Public
export const deleteClient = async (req: Request, res: Response) => {
    try {
        const deleteClient = await ClientModel.findByIdAndDelete(req.params.id);
        if (!deleteClient) {
            return res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al eliminar el cliente', error: errorMessage });
    }
}; 