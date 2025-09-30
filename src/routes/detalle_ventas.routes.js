import { Router } from "express";
import { obtenerDetallesVentas, obtenerDetalleVenta, registrarDetalleVenta, eliminarDetalleVenta, actualizarParcialDetalleVenta } from "../controllers/detalles_ventas.controllers.js";

const router = Router();

// Ruta para obtener todos los detalles de ventas
router.get("/detallesventas", obtenerDetallesVentas);


// Ruta para obtenr un detalle de venta por su ID
router.get("/detalleventa/:id_detalle_venta", obtenerDetalleVenta);

// Ruta para registrar un nuevo detalle venta
router.post('/registrardetalleventa', registrarDetalleVenta);

//ruta para eliminar un detalle de venta por su ID
router.delete('/eliminardetalleventa/:id_detalle_venta', eliminarDetalleVenta);

// Ruta para actualizar un detalle de venta por su ID
router.put('/actualizardetalleventa/:id_detalle_venta', actualizarParcialDetalleVenta);

export default router;