import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/User.model';

// Extendemos la interfaz de Request de Express para añadir nuestra propiedad 'user'
interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {     // Leer el token de las cabeceras (headers)
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { id: string }; //  Verificar el token con nuestro secreto

    req.user = await UserModel.findById(decoded.id).select('-password'); // 4. Obtener la información del usuario desde la BD (sin la contraseña) y adjuntarla al objeto 'req' para que las siguientes rutas la puedan usar.
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
    }

    next(); // 5. Si todo está bien, pasamos al siguiente middleware o al controlador

    } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'No autorizado, el token falló' });
    }
}
