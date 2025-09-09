import { Router } from "express";
import { obtenerEmpleados, obtenerEmpleado } from "../controllers/empleados.controllers.js";

const router = Router();

// Ruta para obtener todos los empleados
router.get("/empleado", obtenerEmpleados);



// Ruta para obtenr un empleado por su ID
router.get("/empleado/:id_empleado", obtenerEmpleado);

export default router;