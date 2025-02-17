import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class SearchLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint: string;

  @Column({ type: 'json', nullable: true })
  queryParams: any;

  @CreateDateColumn()
  createdAt: Date;
}