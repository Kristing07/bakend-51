import { Router } from "express";
import { obtenerDetallesVentas, obtenerDetalleVenta } from "../controllers/detalles_ventas.controllers.js";

const router = Router();

// Ruta para obtener todos los detalles de ventas
router.get("/detallesventas", obtenerDetallesVentas);


// Ruta para obtenr un detalle de venta por su ID
router.get("/detalleventa/:id_detalle_venta", obtenerDetalleVenta);

export default router;