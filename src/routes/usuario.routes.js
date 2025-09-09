import { Router } from "express";
import { obtenerUsuarios, obtenerUsuario } from "../controllers/usuario.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);


// Ruta para obtenr un usuario por su ID
router.get("/usuario/:id_usuario", obtenerUsuario);

export default router;