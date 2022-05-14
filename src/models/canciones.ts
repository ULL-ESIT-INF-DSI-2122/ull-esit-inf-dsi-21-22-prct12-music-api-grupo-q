import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

interface CancionInterface extends Document {
  nombre: string,
  autor: string,
  duracion: string,
  generos: string[],
  single: boolean,
  reproducciones: number
}

const CancionSchema = new Schema({
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
  autor: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El autor de una cancion debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El autor de una cancion solo puede contener caracteres alfanumericos');
      }
    },
  },
  duracion: {
    type: String,
    required: true,
    trim: true,
    //validate: (value: string) => {validDuration(value)},
  },
  generos: {
    type: [String],
    required: true,
  },
  single: {
    type: Boolean,
    required: true,
  },
  reproducciones: {
    type: Number,
    required: true,
  },
});

export const Cancion = model<CancionInterface>('Cancion', CancionSchema);