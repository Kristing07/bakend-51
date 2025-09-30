import { pool } from "../../db_connection.js";

  // Obtener todas las ventas
  export const obtenerVentas = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM ventas");
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos.",
        error: error,
      });
    }
  };

  // Obtener una venta por su ID
  export const obtenerVenta = async (req, res) => {
    try {
      const id_venta = req.params.id_venta;
      const [result] = await pool.query(
        "SELECT * FROM ventas WHERE id_venta= ?",
        [id_venta]
      );
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. ID ${id_venta} no encontrado.`,
        });
      }
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos de las ventas.",
      });
    }
  };

   // Registrar una nueva Venta
  export const registrarVenta = async (req, res) => {
    try {
      const { id_cliente, id_empleado, fecha_venta, total_venta } = req.body;
      const [result] = await pool.query(
        'INSERT INTO ventas (id_cliente, id_empleado, fecha_venta, total_venta) VALUES (?, ?, ?, ?)',
        [id_cliente, id_empleado, fecha_venta, total_venta]
      );
      res.status(201).json({ id_venta: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar la venta.',
        error: error
      });
    }
  };

    // Eliminar un detalle de compra por su ID
export const eliminarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const [result] = await pool.query(
      'DELETE FROM Ventas WHERE id_venta = ?',
      [id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la venta. El ID ${id_venta} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la venta.',
      error: error
    });
  }
};

//Controlador para actualizar parcialmente una venta por su ID
export const actualizarParcialVenta = async (req, res) => {
  try {
    const id_venta = req.params.id_venta;
    const { id_cliente, id_empleado, fecha_venta, total_venta } = req.body;
    const [result] = await pool.query(
      'UPDATE ventas SET id_cliente = IFNULL(?, id_cliente), id_empleado = IFNULL(?, id_empleado), fecha_venta = IFNULL(?, fecha_venta), total_venta = IFNULL(?, total_venta) WHERE id_venta = ?',
      [id_cliente, id_empleado, fecha_venta, total_venta, id_venta]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al actualizar la venta. El ID ${id_venta} no fue encontrado.`,
      });
    }
    res.status(200).json({
      mensaje: `Venta con ID ${id_venta} actualizada correctamente.`
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar la venta.',
      error: error
    });
  }
};