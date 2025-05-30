import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { VideoGameService } from '../videojuegos/videogames.service';
import { CreateVideogameDto } from '../videojuegos/dto/create-videogame.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { HttpAdapter } from 'src/common/interfaces/http-adaptater.interface';

interface RawgGame {
  name: string;
  slug: string;
  released: string;
  genres: Array<{ name: string }>;
}

interface RawgResponse {
  results: RawgGame[];
}

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  private readonly http: HttpAdapter = new AxiosAdapter();


  constructor(private readonly videoGamesService: VideoGameService) {}

  async executeSeed() {
    this.videoGamesService.deleteMany({}); //Se eliminan todos los videojuegos de la base de datos
    try {
      const data = await this.http.get<RawgResponse>(
        'https://api.rawg.io/api/games?key=4d8163ed1a754ee9bd7d28a76a9943a0'
      );

      const games: CreateVideogameDto[] = data.results.map((game) => ({
        name: game.name,
        description: game.slug ?? 'No description',
        price: Math.floor(Math.random() * 40) + 20, // Precio aleatorio entre 20 y 60
        releaseDate: game.released ?? '2000-01-01',
        category: game.genres?.[0]?.name ?? 'Other',
      }));

      return this.videoGamesService.createMany(games);
    } catch (error) {
      console.error('Error in the seed:', error);
      throw error;
    }
  }
}






















/*import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { GamesResponse } from './interfaces/games-response.interface';

@Injectable()
export class SeedService {
    private readonly axios: AxiosInstance = axios;

    async executeSeed() {
        const { data } = await this.axios.get<GamesResponse>('https://api.rawg.io/api/games?key=4d8163ed1a754ee9bd7d28a76a9943a0');
        data.results.forEach(({ name, url }) => {
        });
        return data.results;
    }
}*/


































/*import { Injectable } from '@nestjs/common';
import { VideoGameService } from '../videojuegos/videogames.service';
import { CreateVideogameDto } from '../videojuegos/dto/create-videogame.dto';

@Injectable()
export class SeedService {
    constructor(private readonly videoGamesService: VideoGameService) {}

    async executeSeed() {
        const games: CreateVideogameDto[] = [
            {
                name: 'God of Man Ragnarökaa',
                description: 'Kratos y Atreus enfrentan el apocalipsis nórdico',
                price: 69.99,
                releaseDate: '2022-11-09', // Cambiado a string para coincidir con el DTO
                category: 'Acción'
            },
            {
                name: 'Elden Ringa',
                description: 'Un nuevo RPG de acción y fantasía',
                price: 59.99,
                releaseDate: '2022-02-25', // Cambiado a string para coincidir con el DTO
                category: 'RPG'
            }
        ];

        return this.videoGamesService.createMany(games);
    }
}   */