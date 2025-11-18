import { Router } from "express";
import { eliminarcliente, obtenerClientes, actualizarClientePatch, obtenerCliente, registrarCliente } from "../controllers/clientes.controller.js";


const router = Router();


// Ruta para obtener todos los clientes
router.get("/clientes", obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get("/cliente/:id_cliente", obtenerCliente);

// Ruta para registrar un nuevo Cliente
router.post('/registrarcliente', registrarCliente);


router.delete("/eliminarcliente/:id_cliente", eliminarcliente);

// Ruta para actualizar un cliente por su ID
router.put('/actualizarcliente/:id_cliente', actualizarClientePatch);


export default router;