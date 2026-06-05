const pool = require("../config/db");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.nombre,
        u.email,
        u.password_hash,
        r.nombre AS role
      FROM usuarios_login u
      INNER JOIN roles r
        ON r.id = u.role_id
      WHERE u.email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Usuario no encontrado",
      });
    }

    const user = result.rows[0];

    // TEMPORAL
    // Luego pondremos bcrypt
    if (password !== user.password_hash) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    res.json({
      id: user.id,
      nombre: user.nombre,
      role: user.role,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al iniciar sesión",
    });
  }
};

module.exports = {
  login,
};