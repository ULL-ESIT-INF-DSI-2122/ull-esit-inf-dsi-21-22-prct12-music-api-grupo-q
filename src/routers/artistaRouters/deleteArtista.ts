import * as express from 'express';
import { Artista } from '../../models/artista';

export const deleteArtistaRouter = express.Router();

/* Eliminación de un artista por nombre. */
deleteArtistaRouter.delete('/artista', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proveer un nombre',
    });
  }

  try {
    const artista =
      await Artista.findOneAndDelete({ nombre: req.query.nombre.toString() });

    if (!artista) {
      return res.status(404).send();
    }

    return res.send(artista);
  } catch (error) {
    return res.status(400).send();
  }
});

/* Esta es una ruta que elimina un artista por id. */
deleteArtistaRouter.delete('/artista/:id', async (req, res) => {
  try {
    const artista = await Artista.findByIdAndDelete(req.params.id);

    if (!artista) {
      return res.status(404).send();
    }

    return res.send(artista);
  } catch (error) {
    return res.status(400).send();
  }
});