import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoGameService } from './videogames.service';
import { VideoGamesController } from './videogames.controller';
import { Videogame, VideogameSchema } from './entities/videogame.entity';

/**
 * Módulo de Videojuegos
 * 
 * Este módulo maneja todas las operaciones relacionadas con videojuegos:
 * - Registra el modelo de Videojuego en MongoDB
 * - Proporciona el servicio de Videojuegos
 * - Expone el controlador de Videojuegos
 * 
 * Dependencias:
 * - MongooseModule: Para la conexión con MongoDB
 * - VideoGameService: Para la lógica de negocio
 * - VideoGamesController: Para manejar las rutas HTTP
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Videogame.name,
        schema: VideogameSchema,
      },
    ]),
  ],
  controllers: [VideoGamesController],
  providers: [VideoGameService],
  exports: [VideoGameService],
})
export class VideoGamesModule {}
