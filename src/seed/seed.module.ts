import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { VideoGamesModule } from '../videojuegos/videogames.module';

@Module({
  imports: [VideoGamesModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
