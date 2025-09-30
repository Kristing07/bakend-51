import { Router } from "express";
import { obtenerDetallesCompras, obtenerDetalleCompra, registrarDetalleCompra, eliminarDetalleCompra, actualizarParcialDetalleCompra} from "../controllers/Detalles_compras.controllers.js";

const router = Router();

// Ruta para obtener todos los detalles de 
router.get("/detallescompra", obtenerDetallesCompras);

// Ruta para obtenr un detalle de compra por su ID
router.get("/detallecompra/:id_detalle_compra", obtenerDetalleCompra);

// Ruta para registrar un nuevo Detalle de Compra
router.post('/registrardetallecompra', registrarDetalleCompra);

//ruta para eliminar un detalle de compra por su ID
router.delete('/eliminardetallecompra/:id_detalle_compra', eliminarDetalleCompra);

// Ruta para actualizar un detalle de compra por su ID
router.put('/actualizardetallecompra/:id_detalle_compra', actualizarParcialDetalleCompra);


export default router;