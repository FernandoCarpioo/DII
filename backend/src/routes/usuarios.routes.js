const express = require("express");

const router = express.Router();

const {
  crearUsuario,
  getUsuarios,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuarios.controller");

router.get("/", getUsuarios);

router.post("/", crearUsuario);

router.put("/:id", actualizarUsuario);

router.delete("/:id", eliminarUsuario);

module.exports = router;