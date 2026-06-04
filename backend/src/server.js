const express = require("express");
const cors = require("cors");

const equiposRoutes = require("./routes/equipos.routes");
const authRoutes = require("./routes/auth.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const gruposRoutes = require("./routes/grupos.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/equipos", equiposRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/grupos", gruposRoutes);


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});