import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Función principal que inicia la aplicación
 * Configura los pipes globales y el prefijo de la API
 */
async function bootstrap() {
  // Crear la instancia de la aplicación
  const app = await NestFactory.create(AppModule);
  
  // Configurar el prefijo global para todas las rutas
  app.setGlobalPrefix('api/v2');

  // Configurar el pipe de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no definidas
      transform: true, // Convierte los datos a los tipos definidos en el DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Iniciar el servidor en el puerto especificado o 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecutar la aplicación
bootstrap();

