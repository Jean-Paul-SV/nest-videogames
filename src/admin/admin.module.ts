import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { VideoGamesModule } from '../videojuegos/videogames.module';

@Module({
  imports: [VideoGamesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {} 