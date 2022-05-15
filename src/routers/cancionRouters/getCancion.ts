import * as express from 'express';
import { Cancion } from '../../models/canciones';

export const getCancionRouter = express.Router();

/* Este es un controlador de ruta para el punto final `/canciones`.
Está utilizando el objeto `req.query` para obtener el parámetro de consulta `nombre`.
Si el parámetro de consulta `nombre` está presente, lo usará para filtrar los resultados.
Si el parámetro de consulta `nombre` no está presente, devolverá todas las listas de reproducción. */

getCancionRouter.get('/canciones', async (req, res) => {
  const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};

  try {
    const canciones = await Cancion.find(filter);

    if (canciones.length !== 0) {
      return res.send(canciones);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});

/* Este es un controlador de ruta para el punto final `/canciones/:id`.
Está utilizando `req.params.id` para obtener el parámetro `id`.
Si el parámetro `id` está presente, lo usará para filtrar los resultados.
Si el parámetro `id` no está presente, devolverá todas las listas de reproducción. */

getCancionRouter.get('/canciones/:id', async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id);

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(500).send();
  }
});
