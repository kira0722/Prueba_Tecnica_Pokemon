import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreateRateDto } from './dto/create-rate.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('name/:name')
  async getOne(@Param('name') name: string) {
    return this.pokemonService.getOne(name);
  }

  @Get()
  async getAll(
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return this.pokemonService.getAll(offset ? Number(offset) : 0, limit ? Number(limit) : 20);
  }

  @Post('rate')
  async ratePokemon(@Body() createRateDto: CreateRateDto) {
    return this.pokemonService.ratePokemon(createRateDto);
  }

  @Get('top')
  async getTopRated(@Query('top') top: number) {
    return this.pokemonService.getTopRated(top ? Number(top) : 5);
  }

  @Get('search')
  async searchPokemon(
    @Query('name') name: string,
    @Query('ope') ope: string,
    @Query('base_experience') base_experience: number,
  ) {
    return this.pokemonService.searchPokemon(
      name,
      ope,
      base_experience ? Number(base_experience) : 0,
    );
  }
}
