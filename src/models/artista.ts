import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

interface ArtistaInterface extends Document {
  nombre: string,
  generos: string[],
  canciones: string[],
  oyentesmensuales: number
}

const ArtistaSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre de un artista debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El nombre de un artista solo puede contener caracteres alfanumericos');
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
  oyentesmensuales: {
    type: Number,
    required: true,
  },
});

export const Artista = model<ArtistaInterface>('Artista', ArtistaSchema);