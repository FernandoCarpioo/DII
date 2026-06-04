const pool = require("../config/db");

const getEquipos = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM equipos ORDER BY id"
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al obtener equipos"
    });

  }
};

const createEquipo = async (req, res) => {

  try {

    const {
      nombre,
      ubicacion
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO equipos
      (
        nombre,
        ubicacion
      )
      VALUES
      (
        $1,
        $2
      )
      RETURNING *
      `,
      [
        nombre,
        ubicacion
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al crear equipo"
    });

  }
};

module.exports = {
  getEquipos,
  createEquipo
};