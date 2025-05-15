import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VideoGameService } from './videogames.service';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('videogames')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGameService) {}

  @Post()
  create(@Body() createVideogameDto: CreateVideogameDto) {
    return this.videoGamesService.create(createVideogameDto);
  }

  @Post('bulk')
  createMany(@Body() videojuegos: CreateVideogameDto[]) {
    return this.videoGamesService.createMany(videojuegos);
  }

  @Get()
  findAll() {
    return this.videoGamesService.findAll();
  }

    @Get('search/name/:name')
  findByName(@Param('name') name: string) {
    return this.videoGamesService.findByName(name);
  }

  @Get('search/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.videoGamesService.findBySlug(slug);
  }

  @Patch('update/nombre/:name')
  updateByName(@Param('name') name: string, @Body() dto: UpdateVideogameDto) {
    return this.videoGamesService.updateByName(name, dto);
  }

  @Patch('update/slug/:slug')
  updateBySlug(@Param('slug') slug: string, @Body() dto: UpdateVideogameDto) {
    return this.videoGamesService.updateBySlug(slug, dto);
  }

  @Delete('delete/nombre/:name')
  removeByName(@Param('name') name: string) {
    return this.videoGamesService.removeByName(name);
  }

  @Delete('delete/slug/:slug')
  removeBySlug(@Param('slug') slug: string) {
    return this.videoGamesService.removeBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoGamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideogameDto: UpdateVideogameDto) {
    return this.videoGamesService.update(id, updateVideogameDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.videoGamesService.remove(id);
  }
}
