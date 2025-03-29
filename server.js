require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarios = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Endpoint: Obtener todos los usuarios y aplicar filtros
app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

// Endpoint: Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.status(200).json(usuario);
});

// Endpoint: Agregar un usuario
app.post('/usuarios', (req, res) => {
    const usuario = { id: req.body.id, nombre: req.body.nombre, edad: req.body.edad };
    usuarios.push(usuario);
    res.status(200).json(usuario);
});

// Endpoint: Modificar un usuario por ID
app.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = { id: req.body.id, nombre: req.body.nombre, edad: req.body.edad };
    const userIndex = usuarios.findIndex(u => u.id === usuarioId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuarios[userIndex].nombre = usuario.nombre;
    usuarios[userIndex].edad = usuario.edad;
    res.status(200).json(usuarios[userIndex]);
});

// Endpoint: Modificar un usuario por ID
app.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = { id: req.body.id, nombre: req.body.nombre, edad: req.body.edad };
    const userIndex = usuarios.findIndex(u => u.id === usuarioId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuarios[userIndex].nombre = usuario.nombre;
    usuarios[userIndex].edad = usuario.edad;
    res.status(200).json(usuarios[userIndex]);
});

// Endpoint: Eliminar un usuario por ID
app.delete('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const userIndex = usuarios.findIndex(u => u.id === usuarioId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const usuarioEliminado = usuarios.splice(userIndex, 1);
    res.json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado[0] });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
});
