const express = require('express');
const router = express.Router();
const usuarios = require('./data');

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== process.env.AUTH_TOKEN) {
        return res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }
    next();
};

// Endpoint: Obtener todos los usuarios y aplicar filtros
router.get('/usuarios', authenticateToken, (req, res) => {
    const { nombre, edad, page = 1, limit = 10 } = req.query;
    console.log(req.query);
    let filteredusuarios = usuarios;

    if (nombre) {
        filteredusuarios = filteredusuarios.filter(user => user.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    if (edad) {
        filteredusuarios = filteredusuarios.filter(user => user.edad === parseInt(edad));
    }

    if (filteredusuarios.length === 0) {
        return res.status(404).send('No se encontraron usuarios con los parámetros de búsqueda');
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsuarios = filteredusuarios.slice(startIndex, endIndex);

    res.status(200).json({
        total: filteredusuarios.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedUsuarios
    });
});

// Endpoint: Obtener un usuario por ID
router.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Usuario no encontrado');
  res.json(user);
});

// Endpoint: Agregar un usuario
router.post('/usuarios', (req, res) => {
  const { nombre, edad } = req.body;
  if (!nombre || !edad) {
    return res.status(400).json({ mensaje: 'Nombre y edad son requeridos' });
  }
  const newUser = {
    id: usuarios.length + 1,
    nombre,
    edad: parseInt(edad)
  };
  usuarios.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint: Modificar un usuario por ID
router.put('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Usuario no encontrado');
  const { nombre, edad } = req.body;
  if (nombre) user.nombre = nombre;
  if (edad) user.edad = parseInt(edad);

  res.json(user);
});

// Endpoint: Eliminar un usuario por ID
router.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Usuario no encontrado');

  usuarios.splice(index, 1);
  res.send('Usuario eliminado');
});

module.exports = router;