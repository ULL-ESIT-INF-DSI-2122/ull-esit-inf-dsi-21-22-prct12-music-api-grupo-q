import * as express from 'express';
import { Cancion } from '../../models/canciones';

export const deleteCancionRouter = express.Router();

/* Esta es una ruta que borra una canción por su título. */
deleteCancionRouter.delete('/canciones', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proporcionar un nombre',
    });
  }

  try {
    const cancion =
      await Cancion.findOneAndDelete({ nombre: req.query.nombre.toString() });

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send();
  }
});

/* Esta es una ruta que borra una canción por su id. */
deleteCancionRouter.delete('/canciones/:id', async (req, res) => {
  try {
    const cancion = await Cancion.findByIdAndDelete(req.params.id);

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send();
  }
});