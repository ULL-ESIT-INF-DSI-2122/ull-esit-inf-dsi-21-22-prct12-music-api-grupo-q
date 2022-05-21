import * as express from 'express';
import { Artista } from '../../models/artista';

export const patchArtistaRouter = express.Router();

patchArtistaRouter.patch('/artista', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proveer un nombre',
    });
  }

  const allowedUpdates = ['nombre', 'generos', 'canciones', 'oyentesmensuales'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const artista =
      await Artista.findOneAndUpdate({ nombre: req.query.nombre.toString() }, req.body, {
        new: true,
        runValidators: true,
      });

    if (!artista) {
      return res.status(404).send();
    }

    return res.send(artista);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchArtistaRouter.patch('/artista/:id', async (req, res) => {
  const allowedUpdates = ['nombre', 'generos', 'canciones', 'oyentesmensuales'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const artista = await Artista.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artista) {
      return res.status(404).send();
    }

    return res.send(artista);
  } catch (error) {
    return res.status(400).send(error);
  }
});