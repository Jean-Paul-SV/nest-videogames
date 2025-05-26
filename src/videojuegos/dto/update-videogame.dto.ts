import { PartialType } from '@nestjs/mapped-types';
import { CreateVideogameDto } from './create-videogame.dto';

/**
 * DTO para la actualización de un videojuego
 * Extiende el DTO de creación pero hace todos los campos opcionales
 * Permite actualizar parcialmente un videojuego existente
 * 
 * Hereda todas las propiedades y validaciones de CreateVideogameDto:
 * - name: string
 * - description?: string
 * - releaseDate?: string
 * - platforms?: string[]
 * - genres?: string[]
 * - developer?: string
 * - publisher?: string
 * - rating?: number
 * - imageUrl?: string
 * - isActive?: boolean
 */
export class UpdateVideogameDto extends PartialType(CreateVideogameDto) {}
 