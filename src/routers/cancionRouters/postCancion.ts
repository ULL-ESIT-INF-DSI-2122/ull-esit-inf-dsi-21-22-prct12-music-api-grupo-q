import * as express from 'express';
import { Cancion } from '../../models/canciones';

export const postCancionRouter = express.Router();

postCancionRouter.post('/canciones', async (req, res) => {
  const cancion = new Cancion(req.body);

  try {
    await cancion.save();
    res.status(201).send(cancion);
  } catch (error) {
    res.status(400).send(error);
  }
});