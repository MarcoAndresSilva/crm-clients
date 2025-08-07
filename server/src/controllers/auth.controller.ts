import { Request, Response } from 'express';
import UserModel from '../models/User.model';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {

    const secret = process.env.JWT_SECRET;   // Usaremos una variable de entorno para el secreto del JWT

    if(!secret) {
        throw new Error('JWT_SECRET no esta definido en el fichero .env');
    }

    return jwt.sign({ id }, secret, { 
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const user = await UserModel.create(
            { username, email, password }
        );
        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,            
                email: user.email,
                token: generateToken(user._id!.toString()),
            }); }else{
                res.status(500).json({ message: 'Error al registrar el usuario' });
            }   
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al registrar el usuario', error: errorMessage });
    }
};

export const loginUser = async (req: Request, res: Response ) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id!.toString()),
            })else{
                res.status(401).json({ message: 'email o contraseña incorrectos' });
            }
        }
    } catch(error) { 
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ message: 'Error al iniciar sesión', error: errorMessage });
    }
} 

