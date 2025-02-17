import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './Entity/pokemon.entity';
import { SearchLog } from './Entity/search-log.entity';
import { PokemonRating } from './Entity/pokemon-rating.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class PokemonService {

  private readonly pokeApiUrl = 'https://pokeapi.co/api/v2';


  //constructor entidades
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(SearchLog)
    private readonly searchLogRepository: Repository<SearchLog>,
    @InjectRepository(PokemonRating)
    private readonly ratingRepository: Repository<PokemonRating>,
  ){}


  //metodo obtener pokemon por nombre
  async getOne(name: string): Promise<any> {
    await this.logSearch('getOne', { name });
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.pokeApiUrl}/pokemon/${name}`)
      );
      const data = response.data;
      await this.savePokemonToDB(data);
      return data;
    } catch (error) {
      throw new NotFoundException(`Pokemon ${name} not found`);
    }
  }

  //metodo obtener pokemones listados con offset y limit
  async getAll(offset = 0, limit = 20): Promise<any> {
    await this.logSearch('getAll', { offset, limit });
    const response = await firstValueFrom(
      this.httpService.get(`${this.pokeApiUrl}/pokemon?offset=${offset}&limit=${limit}`)
    );
    return response.data;
  }


  //metodo calificar pokemon (1-5)
  async ratePokemon(createRateDto: CreateRateDto): Promise<PokemonRating> {
    await this.logSearch('ratePokemon', createRateDto);
    const rating = this.ratingRepository.create({
      pokemonId: createRateDto.pokemonId,
      rating: createRateDto.puntuation,
    });
    return this.ratingRepository.save(rating);
  }


  //metodo de obtener top mejores calificados (pokemon)
  async getTopRated(top: number): Promise<any[]> {
    const qb = this.ratingRepository.createQueryBuilder('rating')
      .select('rating.pokemonId', 'pokemonId')
      .addSelect('AVG(rating.rating)', 'avgRating')
      .groupBy('rating.pokemonId')
      .orderBy('"avgRating"', 'DESC')
      .limit(top);
  
    const results = await qb.getRawMany();
  
    const topPokemons = results.map(result => ({
      pokemonId: result.pokemonId,
      avgRating: parseFloat(result.avgRating)
    }));
  
    return topPokemons;
  }

  //metodo buscar pokemones con filtros
  async searchPokemon(name: string, ope: string, base_experience: number): Promise<Pokemon[]> {
    await this.logSearch('searchPokemon', { name, ope, base_experience });
    const qb = this.pokemonRepository.createQueryBuilder('pokemon');

    if (name) {
      qb.andWhere('LOWER(pokemon.name) LIKE :name', { name: `%${name.toLowerCase()}%` });
    }

    if (base_experience !== undefined && ope) {
      let operator: string;
      switch (ope) {
        case 'gt':
          operator = '>';
          break;
        case 'lt':
          operator = '<';
          break;
        case 'ge':
          operator = '>=';
          break;
        case 'le':
          operator = '<=';
          break;
        case 'eq':
          operator = '=';
          break;
        default:
          operator = '=';
      }
      qb.andWhere(`pokemon.baseExperience ${operator} :base_experience`, { base_experience });
    }

    return qb.getMany();
  }

  private async savePokemonToDB(data: any) {
    const existing = await this.pokemonRepository.findOne({ where: { id: data.id } });
    if (!existing) {
      const pokemon = this.pokemonRepository.create({
        id: data.id,
        name: data.name,
        baseExperience: data.base_experience,
      });
      await this.pokemonRepository.save(pokemon);
    }
  }

  private async logSearch(endpoint: string, queryParams: any) {
    const log = this.searchLogRepository.create({
      endpoint,
      queryParams,
    });
    await this.searchLogRepository.save(log);
  }

}
