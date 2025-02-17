import { IsInt, Min, Max } from 'class-validator';

export class CreateRateDto {
    @IsInt()
    pokemonId: number;
  
    @IsInt()
    @Min(1)
    @Max(5)
    puntuation: number;
  }