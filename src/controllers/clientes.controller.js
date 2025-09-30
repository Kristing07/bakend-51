import { pool } from "../../db_connection.js";

// Obtener todas las categorías
export const obtenerClientes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clientes");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos.",
      error: error,
    });
  }
};

// Obtener una categoría por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const [result] = await pool.query(
      "SELECT * FROM Clientes WHERE id_cliente= ?",
      [id_cliente]
    );
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. ID ${id_cliente} no encontrado.`,
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las clientes.",
    });
  }
};

// Registrar una nueva Cliente
export const registrarCliente = async (req, res) => {
  try {
    const { primer_nombre,
          segundo_nombre,
        primer_apellido,
      segundo_apellido, telefono, 
    direccion, cedula } 
    = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, direccion, cedula) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [primer_nombre,
         segundo_nombre, primer_apellido, segundo_apellido, telefono, direccion, cedula ]
    );
    res.status(201).json({ id_categoria: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al registrar la cliente.",
      error: error,
    });
  }
};

// Eliminar una categoría por su ID
export const eliminarCliente = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const [result] = await pool.query(
      'DELETE FROM Clientes WHERE id_cliente = ?',
      [id_cliente]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la categoria. El ID ${id_cliente} no fue encontrado.`
      });
    }

    // Respuesta sin contenido para indicar éxito
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el cliente.',
      error: error
    });
  }
};

//Controlador para actualizar un cliente por su ID
export const actualizarClientePatch = async (req, res) => {
  try {
    const id_cliente = req.params.id_cliente;
    const { primer_nombre
      , segundo_nombre,
      primer_apellido,
      segundo_apellido, telefono
      , direccion,
      cedula } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET primer_nombre = IFNULL(?, primer_nombre), segundo_nombre = IFNULL(?, segundo_nombre), primer_apellido = IFNULL(?, primer_apellido), segundo_apellido = IFNULL(?, segundo_apellido), telefono = IFNULL(?, telefono), direccion = IFNULL(?, direccion), cedula = IFNULL(?, cedula) WHERE id_cliente = ?',
      [primer_nombre
        , segundo_nombre, primer_apellido, segundo_apellido, telefono, direccion, cedula, id_cliente]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al actualizar la categoria. El ID ${id_cliente} no fue encontrado.`,
      });
    }
    res.status(200).json({
    mensaje: `Cliente con ID ${id_cliente} actualizada correctamente.`
    });
  }
  catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al actualizar el cliente.',
      error: error
    });
  }
};