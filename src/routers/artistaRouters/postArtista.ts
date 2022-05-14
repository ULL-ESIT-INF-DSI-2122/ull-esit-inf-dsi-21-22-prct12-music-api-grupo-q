import * as express from 'express';
import { Artista } from '../../models/artista';

export const postArtistaRouter = express.Router();

/* Crear un nuevo artista y guardarlo en la base de datos. */
postArtistaRouter.post('/artista', async (req, res) => {
  const artista = new Artista(req.body);

  try {
    await artista.save();
    res.status(201).send(artista);
  } catch (error) {
    res.status(400).send(error);
  }
});