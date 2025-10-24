import { Router } from "express";
import { obtenerUsuarios, obtenerUsuario,registrarUsuario, eliminarUsuario, actualizarUsuariosPatch } from "../controllers/usuario.controller.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);


// Ruta para obtenr un usuario por su ID
router.get("/usuario/:id_usuario", obtenerUsuario);

// Ruta para registrar un nuevo Usuario
router.post('/registrarusuario', registrarUsuario);

//ruta para eliminar un usuario por su ID
router.delete('/eliminarusuario/:id_usuario', eliminarUsuario);

// Ruta para actualizar un usuario por su ID
router.put('/actualizarusuario/:id_usuario', actualizarUsuariosPatch);

export default router;