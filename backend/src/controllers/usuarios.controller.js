const pool = require("../config/db");

// ======================================
// OBTENER USUARIOS
// ======================================

const getUsuarios = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        u.id,
        u.username,
        u.nombre,
        u.email,
        u.puesto,
        u.activo,
        r.nombre AS rol,
        u.role_id
      FROM usuarios u
      INNER JOIN roles r
        ON r.id = u.role_id
      ORDER BY u.id
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener usuarios"
    });

  }
};

// ======================================
// CREAR USUARIO
// ======================================

const crearUsuario = async (req, res) => {

  try {

    const {
      username,
      nombre,
      email,
      password,
      puesto,
      role_id
    } = req.body;

    await pool.query(
      `
      INSERT INTO usuarios
      (
        username,
        nombre,
        email,
        password_hash,
        puesto,
        role_id
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
      `,
      [
        username,
        nombre,
        email,
        password,
        puesto,
        role_id
      ]
    );

    res.status(201).json({
      message: "Usuario creado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al crear usuario"
    });

  }
};

// ======================================
// ACTUALIZAR USUARIO
// ======================================

const actualizarUsuario = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      username,
      nombre,
      email,
      puesto,
      role_id
    } = req.body;

    await pool.query(
      `
      UPDATE usuarios
      SET
        username = $1,
        nombre = $2,
        email = $3,
        puesto = $4,
        role_id = $5
      WHERE id = $6
      `,
      [
        username,
        nombre,
        email,
        puesto,
        role_id,
        id
      ]
    );

    res.json({
      message: "Usuario actualizado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al actualizar usuario"
    });

  }
};

// ======================================
// ELIMINAR USUARIO
// ======================================

const eliminarUsuario = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM usuarios
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Usuario eliminado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al eliminar usuario"
    });

  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};