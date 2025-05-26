import { Injectable, Logger } from '@nestjs/common';
import { VideoGameService } from '../videojuegos/videogames.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly videoGameService: VideoGameService) {}

  async cleanDuplicates() {
    this.logger.log('Admin initiated duplicate cleanup');
    return this.videoGameService.cleanDuplicates();
  }
} 