import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

/**
 * Módulo de autenticación
 * Configura y proporciona todos los componentes necesarios para la autenticación
 * 
 * @property imports - Módulos requeridos (JwtModule para manejo de tokens)
 * @property controllers - Controladores del módulo (AuthController)
 * @property providers - Servicios del módulo (AuthService)
 * @property exports - Servicios que pueden ser usados por otros módulos
 * 
 * NOTA: En producción, la clave secreta debería estar en variables de entorno
 * y el tiempo de expiración del token debería ser configurable
 */
@Module({
  imports: [
    JwtModule.register({
      secret: 'tu_clave_secreta_super_segura', // En producción usar variables de entorno
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {} 