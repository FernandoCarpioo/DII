const express = require("express");

const router = express.Router();

const {
  getEquipos,
  createEquipo
} = require("../controllers/equipos.controller");

router.get("/", getEquipos);

router.post("/", createEquipo);

module.exports = router;