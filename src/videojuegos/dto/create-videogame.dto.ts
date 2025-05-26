import { IsString, IsOptional, IsArray, IsNumber, Min, Max, IsBoolean, IsUrl } from 'class-validator';
/**
 * DTO para la creación de un videojuego
 * Define la estructura y validaciones de los datos necesarios para crear un videojuego
 * 
 * @property {string} name - Nombre del videojuego (requerido)
 * @property {string} description - Descripción del videojuego (opcional)
 * @property {string} releaseDate - Fecha de lanzamiento (opcional)
 * @property {string[]} platforms - Plataformas donde está disponible (opcional)
 * @property {string[]} genres - Géneros del videojuego (opcional)
 * @property {string} developer - Desarrollador del juego (opcional)
 * @property {string} publisher - Publicador del juego (opcional)
 * @property {number} rating - Calificación del juego (opcional, 0-10)
 * @property {string} imageUrl - URL de la imagen de portada (opcional, debe ser URL válida)
 * @property {boolean} isActive - Estado del videojuego (opcional, default: true)
 */
export class CreateVideogameDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    releaseDate?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    platforms?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    genres?: string[];

    @IsString()
    @IsOptional()
    developer?: string;

    @IsString()
    @IsOptional()
    publisher?: string;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsOptional()
    rating?: number;

    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    category: string;
}