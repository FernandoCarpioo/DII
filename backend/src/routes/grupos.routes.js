const express = require("express");
const router = express.Router();

const {
  crearGrupo,
  obtenerGrupos,
  actualizarGrupo, // <-- Importamos el nuevo controlador
  eliminarGrupo
} = require("../controllers/grupos.controller");

router.post("/", crearGrupo);
router.get("/", obtenerGrupos);
router.put("/:id", actualizarGrupo); 
router.delete("/:id", eliminarGrupo);

module.exports = router;