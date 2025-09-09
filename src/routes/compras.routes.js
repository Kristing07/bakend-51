import { Router } from 'express';
import { obtenerCompras, obtenerCompra } from '../controllers/compra.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/compras', obtenerCompras);



// Ruta para obtener un cliente por su ID
router.get('/compra/:id_compra', obtenerCompra);

export default router;