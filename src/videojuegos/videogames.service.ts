import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideogameDto } from './dto/create-videogame.dto';
import { UpdateVideogameDto } from './dto/update-videogame.dto';
import { Videogame } from './entities/videogame.entity';

@Injectable()
export class VideoGameService {
  constructor(
    @InjectModel(Videogame.modelName) private videogameModel: Model<Videogame>
  ) {}

  async create(createVideogameDto: CreateVideogameDto) {
    createVideogameDto.name = createVideogameDto.name.toLowerCase();
  
    const exists = await this.videogameModel.findOne({ name: createVideogameDto.name });
    if (exists) {
      throw new BadRequestException(`This game '${exists.name}' already exists.`);
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

  findAll() {
    return this.videogameModel.find();
  }

  async findByName(name: string): Promise<Videogame[]> {
    const game = await this.videogameModel.find({
      name: { $regex: name, $options: 'i' }
    });

    if (!game || game.length === 0) {
      throw new NotFoundException(`No games found that match: ${name}`);
    }

    return game;
  }
  
  async findBySlug(slug: string) {
    const game = await this.videogameModel.findOne({ slug });
    if (!game) {
      throw new NotFoundException(`No game found that match: ${slug}`);
    }
    return game;
  }
  

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

  async updateByName(name: string, updateVideogameDto: UpdateVideogameDto) {
    const games = await this.findByName(name);
    if (games.length === 0) {
      throw new NotFoundException(`No game found that match: ${name}`);
    }
    return this.videogameModel.findByIdAndUpdate(games[0]._id, updateVideogameDto, { new: true });
  }

  async updateBySlug(slug: string, updateVideogameDto: UpdateVideogameDto) {
    const game = await this.findBySlug(slug);
    return this.videogameModel.findByIdAndUpdate(game._id, updateVideogameDto, { new: true });
  }

  async removeByName(name: string) {
    const games = await this.findByName(name);
    if (games.length === 0) {
      throw new NotFoundException(`No game found that match: ${name}`);
    }
    return this.videogameModel.findByIdAndDelete(games[0]._id);
  }

  async removeBySlug(slug: string) {
    const game = await this.findBySlug(slug);
    return this.videogameModel.findByIdAndDelete(game._id);
  }

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

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('One or more games already exist in the database.');
    }
    throw new InternalServerErrorException('Error creating games.');
  }
  
  async createMany(videogames: CreateVideogameDto[]) {
    const gamesProcessed = videogames.map(game => ({
      ...game,
      name: game.name.toLowerCase(),
      slug: this.generateSlug(game.name)
    }));
  
    try {
      return await this.videogameModel.insertMany(gamesProcessed);
    } catch (error) {
      this.handleException(error);
    }
  }
}
