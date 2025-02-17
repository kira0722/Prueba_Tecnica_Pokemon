import { Module } from '@nestjs/common';
import { AppController } from './pokemon.controller';
import { AppService } from './pokemon.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
