import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

/**
 * Controlador de autenticación
 * Maneja todas las rutas relacionadas con la autenticación de usuarios
 * Base URL: /api/v2/auth
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para iniciar sesión
   * POST /api/v2/auth/login
   * 
   * @param loginDto - Datos de inicio de sesión (email y contraseña)
   * @returns Token JWT para autenticación
   * 
   * Ejemplo de uso:
   * {
   *   "email": "admin@example.com",
   *   "password": "123456"
   * }
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
} 