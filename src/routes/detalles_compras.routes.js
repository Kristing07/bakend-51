import { Router } from "express";
import { obtenerDetalleCompras, obtenerDetalleCompra } from "../controllers/detalles_ventas.controllers.js";

const router = Router();

// Ruta para obtener todos los detalles de 
router.get("/detallesventas", obtenerDetalleCompras);

// Ruta para obtenr un detalle de compra por su ID
router.get("/detalleventa/:id_detalle_venta", obtenerDetalleCompra);

// Ruta para registrar un nuevo Detalle de Compra
router.post('/registrardetallecompra', registrarDetalleCompra);

export default router;