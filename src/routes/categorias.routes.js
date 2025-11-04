import { Router } from "express";
import { obtenerCategorias,obtenerCategoria , registrarCategoria, eliminarCategoria , actualizarCategortaPatch } from "../controllers/categorias.controller.js";

const router = Router();

// Ruta para obtener todos los categorias
router.get("/categorias", obtenerCategorias);

// Ruta para obtenr una categoria por su ID
router.get("/categoria/:id_categorias", obtenerCategoria);

// Ruta para registrar una nueva Categoría
router.post('/registrarcategoria', registrarCategoria);

//Ruta para eliminar una categoría por su ID
router.delete('/eliminarcategoria/:id_categoria', eliminarCategoria);


// Ruta para actualizar parcialmente una categoría por su ID
router.patch('/actualizarcategoria/:id_categoria', actualizarCategortaPatch);

export default router;