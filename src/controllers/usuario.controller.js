import { pool } from "../../db_connection.js";

  // Obtener todas las usuarios
  export const obtenerUsuarios = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM usuarios");
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos.",
        error: error,
      });
    }
  };

  // Obtener una usuario por su ID
  export const obtenerUsuario = async (req, res) => {
    try {
      const id_usuario = req.params.id_usuario;
      const [result] = await pool.query(
        "SELECT * FROM usuarios WHERE id_usuario= ?",
        [id_usuario]
      );
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. ID ${id_usuario} no encontrado.`,
        });
      }
      res.json(result[0]);
    }
    catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos de los usuarios.",
      });
    }
  };

  // Registrar un nuevo Usuario
  export const registrarUsuario = async (req, res) => {
    try {
      const { usuario, contrasena } = req.body;
      const [result] = await pool.query(
        'INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)',
        [usuario, contrasena]
      );
      res.status(201).json({ id_usuario: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar el usuario.',
        error: error
      });
    }
  };