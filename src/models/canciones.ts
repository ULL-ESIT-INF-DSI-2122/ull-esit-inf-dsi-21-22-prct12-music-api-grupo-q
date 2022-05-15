import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

/* Definición de la interfaz del modelo Cancion. */
interface CancionInterface extends Document {
  nombre: string,
  autor: string,
  duracion: string,
  generos: string[],
  single: boolean,
  reproducciones: number
}

/* Definición del esquema para el modelo Cancion. */
const CancionSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z0-9]/)) {
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
      if (!value.match(/^[A-Z0-9]/)) {
        throw new Error('El autor de una cancion debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El autor de una cancion solo puede contener caracteres alfanumericos');
      }
    },
  },
  duracion: {
    type: Number,
    required: true,
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

/* Exportando el modelo Canción. */
export const Cancion = model<CancionInterface>('Cancion', CancionSchema);
