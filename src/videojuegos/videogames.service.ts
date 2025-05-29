import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { Videogame } from './entities/videogame.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
/**
 * Servicio de Videojuegos
 * Maneja la lógica de negocio para las operaciones CRUD de videojuegos
 * Incluye validaciones y manejo de errores
 */
@Injectable()
export class VideoGameService {
  private readonly logger = new Logger(VideoGameService.name);

  constructor(
    @InjectModel(Videogame.name)
    private readonly videogameModel: Model<Videogame>,
    private readonly configService: ConfigService
  ) {}

  /**
   * Crea un nuevo videojuego
   * @param createVideogameDto - Datos del videojuego a crear
   * @returns El videojuego creado
   */
  async create(createVideogameDto: CreateVideogameDto) {
    createVideogameDto.name = createVideogameDto.name.toLowerCase();
  
  
    const normalizedName = createVideogameDto.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    
    // Buscar juegos existentes y normalizar sus nombres para comparación
    const existingGames = await this.videogameModel.find();
    const isDuplicate = existingGames.some(game => {
      const existingNormalizedName = game.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
      return existingNormalizedName === normalizedName;
    });

    if (isDuplicate) {
      throw new BadRequestException(`A game with a similar name already exists.`);
    }
  
    const slug = this.generateSlug(createVideogameDto.name);
  
    return this.videogameModel.create({
      ...createVideogameDto,
      slug
    });
  }
  
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-')     
      .replace(/--+/g, '-');   
  }

  /**
   * Obtiene todos los videojuegos
   * @returns Array de todos los videojuegos
   */
  async findAll(paginationDto: PaginationDto) {
    const { limit = this.configService.get<number>('DEFAULT_LIMIT') || 5, offset = 0 } = paginationDto;
    return this.videogameModel.find()
    .limit (limit)
    .skip (offset)
    .sort({
      no: 1
    })
    .select('-__v');
  }

  /**
   * Busca un videojuego por nombre
   * @param name - Nombre del videojuego
   * @returns Array de videojuegos que coinciden con el nombre
   */
  async findByName(name: string): Promise<Videogame[]> {
    const game = await this.videogameModel.find({
      name: { $regex: name, $options: 'i' }
    });

    if (!game || game.length === 0) {
      throw new NotFoundException(`No games found that match: ${name}`);
    }

    return game;
  }
  
  /**
   * Busca un videojuego por slug
   * @param slug - Slug del videojuego
   * @returns El videojuego encontrado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async findBySlug(slug: string) {
    const game = await this.videogameModel.findOne({ slug });
    if (!game) {
      throw new NotFoundException(`No game found that match: ${slug}`);
    }
    return game;
  }
  

  /**
   * Busca un videojuego por ID
   * @param id - ID del videojuego
   * @returns El videojuego encontrado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async findOne(id: string) {
    try {
      const videogame = await this.videogameModel.findById(id);
      if (!videogame) {
        throw new NotFoundException(`No game found with ID: ${id}`);
      }
      return videogame;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('The provided ID is not valid.');
      }
      throw error;
    }
  }

  /**
   * Actualiza un videojuego por ID
   * @param id - ID del videojuego
   * @param updateVideogameDto - Datos a actualizar
   * @returns El videojuego actualizado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async update(id: string, updateVideogameDto: UpdateVideogameDto) {
    try {
      const videogame = await this.videogameModel.findByIdAndUpdate(
        id,
        updateVideogameDto,
        { new: true }
      );
      if (!videogame) {
        throw new NotFoundException(`No game found with ID: ${id}`);
      }
      return videogame;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('The provided ID is not valid.');
      }
      throw error;
    }
  }

  /**
   * Actualiza un videojuego por nombre
   * @param name - Nombre del videojuego
   * @param updateVideogameDto - Datos a actualizar
   * @returns El videojuego actualizado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async updateByName(name: string, updateVideogameDto: UpdateVideogameDto) {
    const games = await this.findByName(name);
    if (games.length === 0) {
      throw new NotFoundException(`No game found that match: ${name}`);
    }
    return this.videogameModel.findByIdAndUpdate(games[0]._id, updateVideogameDto, { new: true });
  }

  /**
   * Actualiza un videojuego por slug
   * @param slug - Slug del videojuego
   * @param updateVideogameDto - Datos a actualizar
   * @returns El videojuego actualizado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async updateBySlug(slug: string, updateVideogameDto: UpdateVideogameDto) {
    const game = await this.findBySlug(slug);
    return this.videogameModel.findByIdAndUpdate(game._id, updateVideogameDto, { new: true });
  }

  /**
   * Elimina un videojuego por nombre
   * @param name - Nombre del videojuego
   * @returns El videojuego eliminado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async removeByName(name: string) {
    const games = await this.findByName(name);
    if (games.length === 0) {
      throw new NotFoundException(`No game found that match: ${name}`);
    }
    return this.videogameModel.findByIdAndDelete(games[0]._id);
  }

  /**
   * Elimina un videojuego por slug
   * @param slug - Slug del videojuego
   * @returns El videojuego eliminado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async removeBySlug(slug: string) {
    const game = await this.findBySlug(slug);
    return this.videogameModel.findByIdAndDelete(game._id);
  }

  /**
   * Elimina un videojuego por ID
   * @param id - ID del videojuego
   * @returns El videojuego eliminado
   * @throws NotFoundException si no se encuentra el videojuego
   */
  async remove(id: string) {
    try {
      const videogame = await this.videogameModel.findByIdAndDelete(id);
      if (!videogame) {
        throw new NotFoundException(`No game found with ID: ${id}`);
      }
      return videogame;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('The provided ID is not valid.');
      }
      throw error;
    }
  }

  async deleteMany(filter: any) {
    return this.videogameModel.deleteMany(filter);
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('One or more games already exist in the database.');
    }
    throw new InternalServerErrorException('Error creating games.');
  }
  
  /**
   * Crea múltiples videojuegos
   * @param videojuegos - Array de videojuegos a crear
   * @returns Array de videojuegos creados
   */
  async createMany(videogames: CreateVideogameDto[]) {
    // Normalizar todos los nombres de los juegos nuevos
    const normalizedNewGames = videogames.map(game => ({
      ...game,
      name: game.name.toLowerCase(),
      normalizedName: game.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      slug: this.generateSlug(game.name)
    }));

    // Obtener juegos existentes
    const existingGames = await this.videogameModel.find();
    const normalizedExistingGames = existingGames.map(game => ({
      ...game,
      normalizedName: game.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    }));

    // Verificar duplicados
    const duplicates = normalizedNewGames.filter(newGame => 
      normalizedExistingGames.some(existingGame => 
        existingGame.normalizedName === newGame.normalizedName
      )
    );

    if (duplicates.length > 0) {
      throw new BadRequestException(
        `The following games already exist: ${duplicates.map(d => d.name).join(', ')}`
      );
    }

    try {
      return await this.videogameModel.insertMany(normalizedNewGames);
    } catch (error) {
      this.handleException(error);
    }
  }

  async cleanDuplicates() {
    if (process.env.NODE_ENV === 'production') {
      throw new BadRequestException(
        'This operation is only available in development mode. For production, contact the administrator.'
      );
    }

    const allGames = await this.videogameModel.find();
    const normalizedGames = allGames.map(game => ({
      ...game,
      normalizedName: game.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    }));

    const duplicates = new Map();
    const toDelete: string[] = [];
    const duplicateGroups: { [key: string]: string[] } = {};

    // Agrupar juegos por nombre normalizado
    normalizedGames.forEach(game => {
      if (!duplicates.has(game.normalizedName)) {
        duplicates.set(game.normalizedName, []);
      }
      duplicates.get(game.normalizedName).push(game);
    });

    // Identificar duplicados para eliminar
    duplicates.forEach((games, normalizedName) => {
      if (games.length > 1) {
        const [keep, ...remove] = games;
        const idsToRemove = remove.map(game => game._id.toString());
        toDelete.push(...idsToRemove);
        duplicateGroups[normalizedName] = idsToRemove;
      }
    });

    if (toDelete.length === 0) {
      return { message: 'No duplicates found' };
    }

    // Crear respaldo antes de eliminar
    const backup = await this.createBackup(toDelete);
    
    try {
      // Registrar la operación antes de eliminar
      this.logger.log('Starting duplicate cleanup operation', {
        timestamp: new Date().toISOString(),
        totalDuplicates: toDelete.length,
        duplicateGroups,
        backupId: backup.id
      });

      // Eliminar duplicados
      await this.videogameModel.deleteMany({ _id: { $in: toDelete } });

      this.logger.log('Duplicate cleanup completed successfully', {
        backupId: backup.id,
        removedCount: toDelete.length
      });

      return {
        message: `Removed ${toDelete.length} duplicate games`,
        removedIds: toDelete,
        duplicateGroups,
        backupId: backup.id
      };
    } catch (error) {
      this.logger.error('Error during duplicate cleanup', {
        error: error.message,
        backupId: backup.id
      });
      throw error;
    }
  }

  private async createBackup(idsToDelete: string[]) {
    const gamesToBackup = await this.videogameModel.find({ _id: { $in: idsToDelete } });
    
    // Aquí podrías implementar la lógica para guardar el respaldo  
    // Por ejemplo, en un archivo JSON o en una colección separada
    const backup = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      games: gamesToBackup
    };

    // Por ahora solo lo logueamos
    this.logger.log('Backup created', {
      backupId: backup.id,
      gamesCount: gamesToBackup.length
    });

    return backup;
  }
}