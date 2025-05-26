import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) para el proceso de login
 * Define la estructura y validaciones de los datos de inicio de sesión
 * 
 * @property email - Correo electrónico del usuario (debe ser un email válido)
 * @property password - Contraseña del usuario (mínimo 6 caracteres)
 * 
 * Ejemplo:
 * {
 *   "email": "usuario@ejemplo.com",
 *   "password": "123456"
 * }
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
} 