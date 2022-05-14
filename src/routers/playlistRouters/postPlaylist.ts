import * as express from 'express';
import { Playlist } from '../../models/playlists';

/* Creación de un nuevo enrutador para la ruta de la lista de reproducción. */
export const postPlaylistRouter = express.Router();

/* Creación de una nueva lista de reproducción. */
postPlaylistRouter.post('/playlist', async (req, res) => {
  const playlist = new Playlist(req.body);

  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});