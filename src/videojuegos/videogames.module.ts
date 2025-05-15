import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoGameService } from './videogames.service';
import { VideoGamesController } from './videogames.controller';
import { Videogame, VideogameSchema } from './entities/videogame.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Videogame.modelName, schema: VideogameSchema }
    ])
  ],
  controllers: [VideoGamesController],
  providers: [VideoGameService],
})
export class VideoGamesModule {}
