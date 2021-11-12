import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SelectCharacter } from './dto/select-character.dto';
import { AddAlliesDto } from './dto/add-allies.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll(@Query() selection: SelectCharacter) {
    return this.charactersService.findAll(selection);
  }

  @Get('random')
  findRandom() {
    return this.charactersService.findRandom();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.charactersService.findOne(name);
  }

  @Patch('enemies/:uuid')
  addEnemies(@Param('uuid') uuid: string, @Body() body: AddAlliesDto) {
    return this.charactersService.addEnemies(uuid, body);
  }

  @Patch('weapons/:uuid')
  addWeapons(@Param('uuid') uuid: string, @Body() body: AddAlliesDto) {
    return this.charactersService.addWeapons(uuid, body);
  }

  @Patch('allies/:uuid')
  addAllies(@Param('uuid') uuid: string, @Body() body: AddAlliesDto) {
    return this.charactersService.addAllies(uuid, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
