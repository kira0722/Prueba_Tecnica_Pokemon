import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'base_experience', type: 'int' })
  baseExperience: number;
}