import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', protect, getDashboardStats); // protegemos la ruta con el middleware

export default router;