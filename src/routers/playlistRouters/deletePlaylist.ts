import * as express from 'express';
import { Playlist } from '../../models/playlists';

export const deletePlaylistRouter = express.Router();

/* Este es un controlador de ruta que eliminará una lista de reproducción por nombre. */
deletePlaylistRouter.delete('/playlist', async (req, res) => {
  if (!req.query.name) {
    return res.status(400).send({
      error: 'A title must be provided',
    });
  }

  try {
    const playlist =
      await Playlist.findOneAndDelete({ title: req.query.name.toString() });

    if (!playlist) {
      return res.status(404).send();
    }

    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});

/* Este es un controlador de ruta que eliminará una lista de reproducción por id. */
deletePlaylistRouter.delete('/playlist/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);

    if (!playlist) {
      return res.status(404).send();
    }

    return res.send(playlist);
  } catch (error) {
    return res.status(400).send();
  }
});