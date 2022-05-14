import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

interface PlayListInterface extends Document {
  nombre: string,
  generos: string[],
  canciones: string[],
  duracion: string
}

const PlayListSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre de una cancion debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El nombre de una cancion solo puede contener caracteres alfanumericos');
      }
    },
  },
  generos: {
    type: [String],
    required: true,
  },
  canciones: {
    type: [String],
    required: true,
  },
  duracion: {
    type: String,
    required: true,
    trim: true,
    //validate: (value: string) => {validDuration(value)},
  },
});

export const Playlist = model<PlayListInterface>('PlayList', PlayListSchema);