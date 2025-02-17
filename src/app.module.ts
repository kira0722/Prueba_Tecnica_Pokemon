import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',       // Reemplaza por tu usuario de PostgreSQL
      password: 'admin',     // Reemplaza por tu contraseña
      database: 'pokemon_prueba',  // Reemplaza por el nombre de tu BD
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo; en producción usar migraciones
    }),
    PokemonModule,
  ],
})
export class AppModule {}
