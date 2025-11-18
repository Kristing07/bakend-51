import { pool } from "../../db_connection.js";

  // Obtener todas las usuarios
  export const obtenerUsuarios = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM Usuarios");
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
        "SELECT * FROM Usuarios WHERE id_usuario= ?",
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
        'INSERT INTO Usuarios (usuario, contrasena) VALUES (?, ?)',
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


   // Eliminar un detalle de compra por su ID
export const eliminarUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const [result] = await pool.query(
      'DELETE FROM Usuarios WHERE id_usuario = ?',
      [id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el Usuario. El ID ${id_usuario} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el Usuario.',
      error: error
    });
  }
};


  
// Controlador para actualizar parcialmente un Usuarios por su ID
export const actualizarUsuariosPatch = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const datos = req.body;

    const [result] = await pool.query(
      'UPDATE Usuarios SET ? WHERE id_usuario = ?',
      [datos, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: `Usuarios con ID ${id_usuario} no encontrada.` });
    }

    res.status(200).json({ mensaje: `Usuarios con ID ${id_usuario} actualizada.` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el Usuarios.', error });
  }
};

