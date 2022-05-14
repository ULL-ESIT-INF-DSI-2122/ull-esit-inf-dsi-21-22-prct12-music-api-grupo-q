import * as express from 'express';
import { Artista } from '../../models/artista';

export const getArtistaRouter = express.Router();

/* Este es un controlador de ruta para el punto final `/artista`.
Está utilizando el objeto `req.query` para obtener el parámetro de consulta `name`.
Si el parámetro de consulta `name` está presente, lo usará para filtrar los resultados.
Si el parámetro de consulta `nombre` no está presente, devolverá todas las listas de reproducción. */

getArtistaRouter.get('/artista', async (req, res) => {
  const filter = req.query.name ? { title: req.query.name.toString() } : {};

  try {
    const artista = await Artista.find(filter);

    if (artista.length !== 0) {
      return res.send(artista);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/* Este es un controlador de ruta para el punto final `/artista/:id`.
Está utilizando `req.params.id` para obtener el parámetro `id`.
Si el parámetro `id` está presente, lo usará para filtrar los resultados.
Si el parámetro `id` no está presente, devolverá todas las listas de reproducción. */

getArtistaRouter.get('/artista/:id', async (req, res) => {
  try {
    const artista = await Artista.findById(req.params.id);

    if (!artista) {
      return res.status(404).send();
    }

    return res.send(artista);
  } catch (error) {
    return res.status(500).send();
  }
});