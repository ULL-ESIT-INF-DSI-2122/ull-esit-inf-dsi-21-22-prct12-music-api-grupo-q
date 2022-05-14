import * as express from 'express';
import { Cancion } from '../../models/canciones';

export const getCancionRouter = express.Router();

getCancionRouter.get('/canciones', async (req, res) => {
  const filter = req.query.name ? { title: req.query.name.toString() } : {};

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