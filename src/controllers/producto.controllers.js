 import { pool } from "../../db_connection.js";

  // Obtener todas las productos
  export const obtenerProducto = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM productos");
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos.",
        error: error,
      });
    }
  };

  // Obtener una producto por su ID
  export const obtenerProductos = async (req, res) => {
    try {
      const id_producto = req.params.id_producto;
      const [result] = await pool.query(
        "SELECT * FROM productos WHERE id_producto= ?",
        [id_producto]
      );
      if (result.length <= 0) {
        return res.status(404).json({
          mensaje: `Error al leer los datos. ID ${id_producto} no encontrado.`,
        });
      } 
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al leer los datos de los productos.",
      });
    }
  };

    // Registrar un nuevo Producto
  export const registrarProducto = async (req, res) => {
    try {
      const { nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen } = req.body;
      const [result] = await pool.query(
        'INSERT INTO productos (nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen]
      );
      res.status(201).json({ id_producto: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar el producto.',
        error: error
      });
    }
  };

  
  // Eliminar un detalle de compra por su ID
export const eliminarProducto = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const [result] = await pool.query(
      'DELETE FROM Productos WHERE id_producto = ?',
      [id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el Empleado. El ID ${id_producto} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el Producto.',
      error: error
    });
  }
};

//Controlador para actualizar parcialmente un producto por su ID
export const actualizarProductoPatch = async (req, res) => {
  try {
    const id_producto = req.params.id_producto;
    const { nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen } = req.body;
    const [result] = await pool.query(
      'UPDATE productos SET nombre_producto = IFNULL(?, nombre_producto), descripcion_producto = IFNULL(?, descripcion_producto), id_categoria = IFNULL(?, id_categoria), precio_unitario = IFNULL(?, precio_unitario), stock = IFNULL(?, stock), imagen = IFNULL(?, imagen) WHERE id_producto = ?',
      [nombre_producto, descripcion_producto, id_categoria, precio_unitario, stock, imagen, id_producto]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al actualizar el producto. El ID ${id_producto} no fue encontrado.`,
      });
    }
    res.status(200).json({
      mensaje: `Producto con ID ${id_producto} actualizada correctamente.`
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el producto.',
      error: error
    });
  } 
};