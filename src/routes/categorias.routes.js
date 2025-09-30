import { Router } from 'express';
import { obtenerCategorias, obtenerCategoria, registrarCategoria, eliminarCategoria,actualizarCategoriaPatch  } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/categorias', obtenerCategorias);


// Ruta para obtener un cliente por su ID
router.get('/categoria/:id_categoria', obtenerCategoria);

// Ruta para registrar una nueva Categoría
router.post('/registrarcategoria', registrarCategoria);

// Ruta para eliminar Categoría
router.post('/eliminarcategorias/:id_categoria', eliminarCategoria);

// Ruta para actualizar parcialmente una categoría por su ID
router.patch('/actualizarcategoria/:id_categoria', actualizarCategoriaPatch);


export default router;