const verificarAdmin = (req, res, next) => {

  const role = req.headers.role;

  if (role !== "admin") {
    return res.status(403).json({
      message: "Acceso denegado"
    });
  }

  next();

};

module.exports = verificarAdmin;