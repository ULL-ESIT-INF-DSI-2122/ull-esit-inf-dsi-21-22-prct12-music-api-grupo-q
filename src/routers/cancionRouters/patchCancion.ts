import * as express from 'express';
import { Cancion } from '../../models/canciones';

export const patchCancionRouter = express.Router();

patchCancionRouter.patch('/canciones', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A title must be provided',
    });
  }

  const allowedUpdates = ['name', 'autor', 'duracion', 'generos', 'single', 'reproducciones'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const cancion =
      await Cancion.findOneAndUpdate({ title: req.query.name.toString() }, req.body, {
        new: true,
        runValidators: true,
      });

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send(error);
  }
});

patchCancionRouter.patch('/canciones/:id', async (req, res) => {
  const allowedUpdates = ['name', 'autor', 'duracion', 'generos', 'single', 'reproducciones'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const cancion = await Cancion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send(error);
  }
});