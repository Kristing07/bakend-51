import { Router } from "express";
import { obtenerVentas, obtenerVenta, registrarVenta,eliminarVenta, actualizarParcialVenta} from "../controllers/ventas.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/ventas", obtenerVentas);


// Ruta para obtenr una venta por su ID
router.get("/venta/:id_venta", obtenerVenta);

// Ruta para registrar una nueva Venta  
router.post('/registrarventa', registrarVenta);

//ruta para eliminar una venta por su ID
router.delete('/eliminarventa/:id_venta', eliminarVenta);

// Ruta para actualizar una venta por su ID 
router.put('/actualizarventa/:id_venta', actualizarParcialVenta);

export default router;