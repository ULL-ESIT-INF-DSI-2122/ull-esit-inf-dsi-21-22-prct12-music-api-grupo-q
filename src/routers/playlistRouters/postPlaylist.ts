import * as express from 'express';
import { Playlist } from '../../models/playlists';

/* Creación de un nuevo enrutador para la ruta de la lista de reproducción. */
export const postPlaylistRouter = express.Router();

/**
 * Funcion que crea una nueva playlist y la almacena en la base de datos.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
postPlaylistRouter.post('/playlist', async (req, res) => {
  const playlist = new Playlist(req.body);

  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});
