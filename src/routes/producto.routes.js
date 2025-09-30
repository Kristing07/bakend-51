import { Router } from "express";
import { obtenerProducto, obtenerProductos,registrarProducto, eliminarProducto ,actualizarProductoPatch } from "../controllers/producto.controllers.js";

const router = Router();

// Ruta para obtener todos los productos
router.get("/producto", obtenerProducto);


// Ruta para obtenr un producto por su ID
router.get("/producto/:id_producto", obtenerProductos);

// Ruta para registrar un nuevo Producto
router.post('/registrarproducto', registrarProducto);

//ruta para eliminar un producto por su ID
router.delete('/eliminarproducto/:id_producto', eliminarProducto);

// Ruta para actualizar un producto por su ID
router.put('/actualizarproducto/:id_producto', actualizarProductoPatch);

export default router;