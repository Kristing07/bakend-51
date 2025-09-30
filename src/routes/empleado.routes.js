import { Router } from "express";
import { obtenerEmpleados, obtenerEmpleado, registrarEmpleado, eliminarEmpleado, actualizarParcialEmpleado } from "../controllers/empleados.controllers.js";

const router = Router();

// Ruta para obtener todos los empleados
router.get("/empleado", obtenerEmpleados);



// Ruta para obtenr un empleado por su ID
router.get("/empleado/:id_empleado", obtenerEmpleado);

// Ruta para registrar un nuevo Empleado
router.post('/registrarempleado', registrarEmpleado);

//ruta para eliminar un empleado por su ID
router.delete('/eliminarempleado/:id_empleado', eliminarEmpleado);

// Ruta para actualizar un empleado por su ID
router.put('/actualizarempleado/:id_empleado', actualizarParcialEmpleado);

export default router;