import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './Entity/pokemon.entity';
import { PokemonRating } from './Entity/pokemon-rating.entity';
import { SearchLog } from './Entity/search-log.entity';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Pokemon, PokemonRating, SearchLog]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}