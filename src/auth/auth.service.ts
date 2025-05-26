import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

/**
 * Servicio de autenticación
 * Maneja la lógica de autenticación y generación de tokens JWT
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Proceso de inicio de sesión
   * 
   * @param loginDto - Datos de inicio de sesión
   * @returns Objeto con el token JWT
   * @throws UnauthorizedException si las credenciales son inválidas
   * 
   * NOTA: En un entorno de producción, esto debería:
   * 1. Validar contra una base de datos
   * 2. Usar hash para las contraseñas
   * 3. Implementar rate limiting
   * 4. Usar variables de entorno para las credenciales
   */
  async login(loginDto: LoginDto) {
    // Aquí normalmente validarías contra una base de datos
    // Por ahora usaremos credenciales hardcodeadas para prueba
    if (loginDto.email === 'admin@example.com' && loginDto.password === '123456') {
      const payload = { 
        email: loginDto.email,
        roles: ['admin']
      };
      
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
} 