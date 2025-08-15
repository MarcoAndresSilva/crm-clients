import { Request, Response } from 'express';
import ClientModel  from '../models/Client-model';

export const getDashboardStats = async (req: Request, res: Response) => {
    try{  
        const totalClients = await ClientModel.countDocuments(); // contar el número de clientes
        const recentClients = await ClientModel.find()
        .sort({createdAt: -1}) // ordenar los clientes por fecha de creación en orden descendente
        .limit(5); // obtener los 5 clientes más recientes

        // TODO añadir mas stats aqui, ejemplo clientes por empresa, etc
        
        res.status(200).json({totalClients, recentClients});
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al obtener las estadisticas', error: errorMessage });
    }
}