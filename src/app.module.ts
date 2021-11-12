import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { typeOrmConfig } from 'src/database/orm.connection';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CharactersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
