import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './Entity/pokemon.entity';
import { SearchLog } from './Entity/search-log.entity';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class PokemonService {

  private readonly pokeApiUrl = 'https://pokeapi.co/api/v2';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(SearchLog)
    private readonly searchLogRepository: Repository<SearchLog>
  ){}

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


  async getAll(offset = 0, limit = 20): Promise<any> {
    await this.logSearch('getAll', { offset, limit });
    const response = await firstValueFrom(
      this.httpService.get(`${this.pokeApiUrl}/pokemon?offset=${offset}&limit=${limit}`)
    );
    return response.data;
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
