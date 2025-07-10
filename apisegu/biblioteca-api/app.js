const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Datos en memoria
let libros = [];
let usuarios = [];
let autores = [];
let libroId = 1;
let usuarioId = 1;
let autorId = 1;

// --- RUTAS CRUD PARA LIBROS ---
app.get('/libros', (req, res) => {
  res.json(libros);
});

app.get('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
});

app.post('/libros', (req, res) => {
  const { titulo, autor, año, genero, id_autor } = req.body;
  if (!titulo || !autor || !año || !genero || !id_autor) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const libro = {
    id: libroId++,
    titulo,
    autor,
    año,
    genero,
    disponible: true,
    id_usuario_prestamo: null,
    id_autor
  };
  libros.push(libro);
  // Relacionar con autor
  const autorObj = autores.find(a => a.id === id_autor);
  if (autorObj) autorObj.libros.push(libro.id);
  res.status(201).json(libro);
});

app.put('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  Object.assign(libro, req.body);
  res.json(libro);
});

app.delete('/libros/:id', (req, res) => {
  const idx = libros.findIndex(l => l.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Libro no encontrado' });
  const libro = libros.splice(idx, 1)[0];
  // Quitar de autor
  const autorObj = autores.find(a => a.id === libro.id_autor);
  if (autorObj) autorObj.libros = autorObj.libros.filter(lid => lid !== libro.id);
  res.json({ mensaje: 'Libro eliminado' });
});

// --- RUTAS CRUD PARA USUARIOS ---
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
});

app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const usuario = {
    id: usuarioId++,
    nombre,
    email,
    libros_prestados: []
  };
  usuarios.push(usuario);
  res.status(201).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  Object.assign(usuario, req.body);
  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  usuarios.splice(idx, 1);
  res.json({ mensaje: 'Usuario eliminado' });
});

// --- RUTAS CRUD PARA AUTORES ---
app.get('/autores', (req, res) => {
  res.json(autores);
});

app.get('/autores/:id', (req, res) => {
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(autor);
});

app.post('/autores', (req, res) => {
  const { nombre, nacionalidad } = req.body;
  if (!nombre || !nacionalidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const autor = {
    id: autorId++,
    nombre,
    nacionalidad,
    libros: []
  };
  autores.push(autor);
  res.status(201).json(autor);
});

app.put('/autores/:id', (req, res) => {
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  Object.assign(autor, req.body);
  res.json(autor);
});

app.delete('/autores/:id', (req, res) => {
  const idx = autores.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Autor no encontrado' });
  autores.splice(idx, 1);
  res.json({ mensaje: 'Autor eliminado' });
});

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de biblioteca escuchando en puerto ${PORT}`);
}); 