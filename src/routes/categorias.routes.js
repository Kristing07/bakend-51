import { Router } from 'express';
import { obtenerCategorias, obtenerCategoria, registrarCategoria } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/categorias', obtenerCategorias);


// Ruta para obtener un cliente por su ID
router.get('/categoria/:id_categoria', obtenerCategoria);

// Ruta para registrar una nueva Categoría
router.post('/registrarcategoria', registrarCategoria);

export default router;