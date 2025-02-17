import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PokemonRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number; // ID del Pokémon (según PokeAPI)

  @Column({ type: 'int' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}