import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id_cliente', obtenerCliente);

// Ruta para registrar una nueva Categoría
router.post('/registrarcliente', registrarCliente);


export default router;