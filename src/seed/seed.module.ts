import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { VideoGamesModule } from '../videojuegos/videogames.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [VideoGamesModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
