import { pool } from "../../db_connection.js";

// Obtener todas las categorías
export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Compras");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos.",
      error: error,
    });
  }
};


// Obtener una compra por su ID
export const obtenerCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      "SELECT * FROM compras WHERE id_compra= ?",
      [id_compra]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_compra} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las compra.",
    });
  }
};

// Registrar una nueva Compra
  export const registrarCompra = async (req, res) => {
    try {
      const { id_empleado, fecha_compra, total_compra } = req.body;
      const [result] = await pool.query(
        'INSERT INTO compras (id_empleado, fecha_compra, total_compra) VALUES (?, ?, ?)',
        [id_empleado, fecha_compra, total_compra]
      );
      res.status(201).json({ id_compra: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar la compra.',
        error: error
      });
    }   
  };

  // Eliminar una compra por su ID
export const eliminarCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const [result] = await pool.query(
      'DELETE FROM Compras WHERE id_compra = ?',
      [id_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la compra. El ID ${id_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la compra.',
      error: error
    });
  }
};

//Controlador para actualizar parcialmente una compra por su ID
export const actualizarParcialCompra = async (req, res) => {
  try {
    const id_compra = req.params.id_compra;
    const { id_empleado, fecha_compra, total_compra } = req.body;
    const [result] = await pool.query(
      'UPDATE Compras SET id_empleado = IFNULL(?, id_empleado), fecha_compra = IFNULL(?, fecha_compra), total_compra = IFNULL(?, total_compra) WHERE id_compra = ?',
      [id_empleado, fecha_compra, total_compra, id_compra]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al actualizar la compra. El ID ${id_compra} no fue encontrado.`,
      });
    }
    res.status(200).json({
      mensaje: `Compra con ID ${id_compra} actualizada correctamente.`
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la compra.',
      error: error
    });
  }
};