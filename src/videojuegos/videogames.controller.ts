import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { VideoGameService } from './videogames.service';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

/**
 * Controlador de Videojuegos
 * Maneja todas las operaciones CRUD para los videojuegos
 * Base URL: /api/v2/videogames
 */
@Controller('videogames')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGameService) {}

  /**
   * Crea un nuevo videojuego
   * POST /api/v2/videogames
   */
  @Post()
  create(@Body() createVideogameDto: CreateVideogameDto) {
    return this.videoGamesService.create(createVideogameDto);
  }

  /**
   * Crea múltiples videojuegos
   * POST /api/v2/videogames/bulk
   */
  @Post('bulk')
  createMany(@Body() videojuegos: CreateVideogameDto[]) {
    return this.videoGamesService.createMany(videojuegos);
  }

  /**
   * Obtiene todos los videojuegos
   * GET /api/v2/videogames
   */
  @Get()
  findAll() {
    return this.videoGamesService.findAll();
  }

  /**
   * Busca videojuegos por nombre
   * GET /api/v2/videogames/search/name/:name
   */
  @Get('search/name/:name')
  findByName(@Param('name') name: string) {
    return this.videoGamesService.findByName(name);
  }

  /**
   * Busca un videojuego por slug
   * GET /api/v2/videogames/search/slug/:slug
   */
  @Get('search/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.videoGamesService.findBySlug(slug);
  }

  /**
   * Actualiza un videojuego por nombre
   * PATCH /api/v2/videogames/update/nombre/:name
   */
  @Patch('update/nombre/:name')
  updateByName(@Param('name') name: string, @Body() dto: UpdateVideogameDto) {
    return this.videoGamesService.updateByName(name, dto);
  }

  /**
   * Actualiza un videojuego por slug
   * PATCH /api/v2/videogames/update/slug/:slug
   */
  @Patch('update/slug/:slug')
  updateBySlug(@Param('slug') slug: string, @Body() dto: UpdateVideogameDto) {
    return this.videoGamesService.updateBySlug(slug, dto);
  }

  /**
   * Elimina un videojuego por nombre
   * DELETE /api/v2/videogames/delete/nombre/:name
   */
  @Delete('delete/nombre/:name')
  removeByName(@Param('name') name: string) {
    return this.videoGamesService.removeByName(name);
  }

  /**
   * Elimina un videojuego por slug
   * DELETE /api/v2/videogames/delete/slug/:slug
   */
  @Delete('delete/slug/:slug')
  removeBySlug(@Param('slug') slug: string) {
    return this.videoGamesService.removeBySlug(slug);
  }

  /**
   * Obtiene un videojuego por ID
   * GET /api/v2/videogames/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoGamesService.findOne(id);
  }

  /**
   * Actualiza un videojuego por ID
   * PATCH /api/v2/videogames/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideogameDto: UpdateVideogameDto) {
    return this.videoGamesService.update(id, updateVideogameDto);
  }

  /**
   * Elimina un videojuego por ID
   * DELETE /api/v2/videogames/:id
   */
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.videoGamesService.remove(id);
  }

  @Post('clean-duplicates')
  @HttpCode(HttpStatus.OK)
  cleanDuplicates() {
    return this.videoGamesService.cleanDuplicates();
  }
}
