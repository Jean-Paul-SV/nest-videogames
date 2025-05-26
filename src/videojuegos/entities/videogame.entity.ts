import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Entidad de Videojuego
 * Define la estructura y validaciones del documento de videojuego en MongoDB
 * 
 * @property {string} name - Nombre del videojuego (único, requerido)
 * @property {string} slug - Identificador único URL-friendly (único, requerido)
 * @property {string} description - Descripción del videojuego
 * @property {string} releaseDate - Fecha de lanzamiento
 * @property {string[]} platforms - Plataformas donde está disponible
 * @property {string[]} genres - Géneros del videojuego
 * @property {string} developer - Desarrollador del juego
 * @property {string} publisher - Publicador del juego
 * @property {number} rating - Calificación del juego (0-10)
 * @property {string} imageUrl - URL de la imagen de portada
 * @property {boolean} isActive - Estado del videojuego en el sistema
 */
@Schema()
export class Videogame extends Document {
  static readonly modelName = 'Videogame';

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  releaseDate: string;

  @Prop([String])
  platforms: string[];

  @Prop([String])
  genres: string[];

  @Prop()
  developer: string;

  @Prop()
  publisher: string;

  @Prop({
    min: 0,
    max: 10,
  })
  rating: number;

  @Prop()
  imageUrl: string;

  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const VideogameSchema = SchemaFactory.createForClass(Videogame);
