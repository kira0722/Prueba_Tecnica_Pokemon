import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class PokemonRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number;

  @Column({ type: 'int' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}