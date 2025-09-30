

import { pool } from "../../db_connection.js";

  // Obtener todas las detalles de compras 
  export const obtenerDetallesCompras = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM detalles_compras");
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos.",
        error: error,
      });
    }
  };


  // Obtener una detalle de compra por su ID
  export const obtenerDetalleCompra = async (req, res) => {
    try {
      const id_detalle_compra = req.params.id_detalle_compra;
      const [result] = await pool.query(
        "SELECT * FROM detalles_compras WHERE id_detalle_compra= ?",
        [id_detalle_compra]
      );  
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. ID ${id_detalle_compra} no encontrado.`,
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos de los detalles de compras.",
      });
    }
  };

    // Registrar un nuevo Detalle de Compra
  export const registrarDetalleCompra = async (req, res) => {
    try { 
      const { id_compra, id_producto, cantidad, precio_unitario } = req.body; 
      const [result] = await pool.query(
        'INSERT INTO detalles_compras (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id_compra, id_producto, cantidad, precio_unitario]
      );
      res.status(201).json({ id_detalle_compra: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar el detalle de compra.',
        error: error
      });
    }
  };

  // Eliminar un detalle de compra por su ID
export const eliminarDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const [result] = await pool.query(
      'DELETE FROM Detalles_Compras WHERE id_detalle_compra = ?',
      [id_detalle_compra]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el detalle compra. El ID ${id_detalle_compra} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el detalle compra.',
      error: error
    });
  }
};

//Controlador para actualizar parcialmente un detalle de compra por su ID
export const actualizarParcialDetalleCompra = async (req, res) => {
  try {
    const id_detalle_compra = req.params.id_detalle_compra;
    const { id_compra, id_producto, cantidad, precio_unitario } = req.body;
    const [result] = await pool.query(
      'UPDATE detalles_compras SET id_compra = IFNULL(?, id_compra), id_producto = IFNULL(?, id_producto), cantidad = IFNULL(?, cantidad), precio_unitario = IFNULL(?, precio_unitario) WHERE id_detalle_compra = ?',
      [id_compra, id_producto, cantidad, precio_unitario, id_detalle_compra]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al actualizar el detalle compra. El ID ${id_detalle_compra} no fue encontrado.`,
      });
    }
    res.status(200).json({
      mensaje: `Detalle de compra con ID ${id_detalle_compra} actualizada correctamente.`
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el detalle compra.',
      error: error
    });
  }
};