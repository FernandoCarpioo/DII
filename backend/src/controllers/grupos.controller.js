const pool = require("../config/db");

// ==========================================
// 1. CREAR GRUPO
// ==========================================
const crearGrupo = async (req, res) => {
  try {
    const { nombre, descripcion, estado, integrantes } = req.body;

    const grupoResult = await pool.query(
      `
      INSERT INTO grupos
      (nombre, descripcion, estado)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [nombre, descripcion, estado]
    );

    const grupoId = grupoResult.rows[0].id;

    if (integrantes && integrantes.length > 0) {
      for (const usuarioId of integrantes) {
        await pool.query(
          `INSERT INTO miembros_grupos (grupo_id, usuario_id, es_administrador) VALUES ($1, $2, false)`,
          [grupoId, usuarioId]
        );
      }
    }

    res.status(201).json({ message: "Grupo creado", grupoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear grupo" });
  }
};

// ==========================================
// 2. OBTENER GRUPOS (Con lógica de Superadmin)
// ==========================================
const obtenerGrupos = async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Definimos los IDs de los superadministradores (Héctor e IT)
    const SUPERADMINS = ['1', '5']; 

    let query = "";
    let values = [];

    // Si el usuario NO es un superadmin (ej. es Lucy o un usuario normal)
    if (userId && !SUPERADMINS.includes(userId.toString())) {
      query = `
        SELECT 
          g.id, 
          g.nombre, 
          g.descripcion, 
          g.estado,
          (SELECT COUNT(*) FROM miembros_grupos WHERE grupo_id = g.id) AS cantidad_integrantes,
          (SELECT COALESCE(ARRAY_AGG(usuario_id::text), '{}') FROM miembros_grupos WHERE grupo_id = g.id) AS integrantes
        FROM grupos g
        INNER JOIN miembros_grupos mg ON g.id = mg.grupo_id
        WHERE mg.usuario_id = $1
        ORDER BY g.id DESC
      `;
      values = [userId];
    } else {
      // Si ES Superadmin (Héctor o IT) o no mandaron ID, ven todo
      query = `
        SELECT 
          g.id, 
          g.nombre, 
          g.descripcion, 
          g.estado,
          COUNT(mg.usuario_id) AS cantidad_integrantes,
          COALESCE(ARRAY_REMOVE(ARRAY_AGG(mg.usuario_id::text), NULL), '{}') AS integrantes
        FROM grupos g
        LEFT JOIN miembros_grupos mg ON g.id = mg.grupo_id
        GROUP BY g.id
        ORDER BY g.id DESC
      `;
    }

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener grupos" });
  }
};

// ==========================================
// 3. ACTUALIZAR GRUPO (NUEVO)
// ==========================================
const actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado, integrantes } = req.body;

    // 1. Actualizamos la información principal del grupo
    await pool.query(
      `UPDATE grupos SET nombre = $1, descripcion = $2, estado = $3 WHERE id = $4`,
      [nombre, descripcion, estado, id]
    );

    // 2. Borramos todos los miembros actuales de este grupo de forma segura
    await pool.query(`DELETE FROM miembros_grupos WHERE grupo_id = $1`, [id]);

    // 3. Insertamos la nueva lista de miembros que nos mandó React
    if (integrantes && integrantes.length > 0) {
      for (const usuarioId of integrantes) {
        await pool.query(
          `INSERT INTO miembros_grupos (grupo_id, usuario_id, es_administrador) VALUES ($1, $2, false)`,
          [id, usuarioId]
        );
      }
    }

    res.status(200).json({ message: "Grupo actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el grupo" });
  }
};

// ==========================================
// 4. ELIMINAR GRUPO
// ==========================================
const eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM miembros_grupos WHERE grupo_id = $1', [id]);
    await pool.query('DELETE FROM grupos WHERE id = $1', [id]);

    res.status(200).json({ message: "Grupo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el grupo" });
  }
};

// Exportamos las 4 funciones
module.exports = {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo,
  eliminarGrupo
};