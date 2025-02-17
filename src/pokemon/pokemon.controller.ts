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
}
