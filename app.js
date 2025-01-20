// Importar las dependencias
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Datos en memoria (simula una base de datos local)
let films = [
  { id: 1, titulo: "Inception", director: "Christopher Nolan", genero: "Ciencia Ficción", puntuacion: 8.8, rating: "PG-13", anio: 2010 },
  { id: 2, titulo: "The Matrix", director: "Wachowskis", genero: "Acción", puntuacion: 8.7, rating: "R", anio: 1999 },
  { id: 3, titulo: "Interstellar", director: "Christopher Nolan", genero: "Ciencia Ficción", puntuacion: 8.6, rating: "PG-13", anio: 2014 }
];

// Rutas

// GET /films: Devuelve la lista de todas las películas
app.get('/films', (req, res) => {
  res.json(films);
});

// GET /films/:id: Devuelve una película específica y referencias
app.get('/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find(f => f.id === id);
  if (!film) return res.status(404).json({ message: 'Película no encontrada' });

  // Simulación de referencias relacionadas
  const references = {
    director: film.director,
    genero: film.genero
  };

  res.json({ ...film, referencias: references });
});

// POST /films: Crea una nueva película
app.post('/films', (req, res) => {
  const { titulo, director, genero, puntuacion, rating, anio } = req.body;
  const id = films.length ? films[films.length - 1].id + 1 : 1;
  const newFilm = { id, titulo, director, genero, puntuacion, rating, anio };
  films.push(newFilm);
  res.status(201).json(newFilm);
});

// PUT /films/:id: Actualiza una película específica
app.put('/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const filmIndex = films.findIndex(f => f.id === id);
  if (filmIndex === -1) return res.status(404).json({ message: 'Película no encontrada' });

  const { titulo, director, genero, puntuacion, rating, anio } = req.body;
  films[filmIndex] = { id, titulo, director, genero, puntuacion, rating, anio };
  res.json(films[filmIndex]);
});

// DELETE /films/:id: Elimina una película específica
app.delete('/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const filmIndex = films.findIndex(f => f.id === id);
  if (filmIndex === -1) return res.status(404).json({ message: 'Película no encontrada' });

  films.splice(filmIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
