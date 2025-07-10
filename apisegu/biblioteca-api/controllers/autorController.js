const { autores } = require('../data/storage');

let autorId = 1;

exports.getAllAutores = (req, res) => {
  res.json({
    message: 'Autores obtenidos exitosamente',
    data: autores,
    total: autores.length
  });
};

exports.getAutorById = (req, res) => {
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(autor);
};

exports.createAutor = (req, res) => {
  const { nombre, nacionalidad, fechaNacimiento } = req.body;
  const nuevoAutor = {
    id: autorId++,
    nombre,
    nacionalidad,
    fechaNacimiento
  };
  autores.push(nuevoAutor);
  res.status(201).json(nuevoAutor);
};

exports.updateAutor = (req, res) => {
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
  const { nombre, nacionalidad, fechaNacimiento } = req.body;
  autor.nombre = nombre;
  autor.nacionalidad = nacionalidad;
  autor.fechaNacimiento = fechaNacimiento;
  res.json(autor);
};

exports.deleteAutor = (req, res) => {
  const idx = autores.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Autor no encontrado' });
  autores.splice(idx, 1);
  res.json({ mensaje: 'Autor eliminado' });
}; 