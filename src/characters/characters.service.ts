import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { getConnection, getRepository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SelectCharacter } from './dto/select-character.dto';
import { Character } from './entities/character.entity';
import { AddAlliesDto } from './dto/add-allies.dto';

@Injectable()
export class CharactersService {
  async create(createCharacterDto: CreateCharacterDto): Promise<void> {
    await getConnection().createQueryBuilder().insert().into(Character).values(createCharacterDto).returning("*").execute();
  }

  async findAll(selection: SelectCharacter) {
    return await getConnection()
      .createQueryBuilder()
      .select(["character.name", "character.element", "character.allies", "character.enemies", "character.weapons"])
      .from(Character, "character")
      .skip(selection.page ? (selection.page - 1) * 5 : 0)
      .take(5)
      .getMany();
  }

  async findOne(name: string) {
    return await getConnection()
      .createQueryBuilder()
      .select(["character.name", "character.element", "character.allies", "character.enemies", "character.weapons", "character.photo"])
      .from(Character, "character").where(`character.name ILIKE '%${name}%'`).getOne();
  }

  async getByUuid(uuid: string) {
    return await getConnection()
      .createQueryBuilder()
      .select(["character.name", "character.element", "character.allies", "character.enemies", "character.weapons"])
      .from(Character, "character").where(`character.uuid = '${uuid}'`).getOne();
  }

  async findRandom() {
    return (await getConnection().createQueryBuilder()
      .select(["character.name", "character.element", "character.allies", "character.enemies", "character.weapons"]).from(Character, "character")
      .getMany())[Math.floor(Math.random() * (await getConnection().createQueryBuilder().from(Character, "character").getCount() - 0)) + 0];
  }

  async addAllies(uuid: string, body: AddAlliesDto) {
    try {
      let array = await this.getByUuid(uuid);
      if (array.allies) {
        for(const names of body.allies){
          array.allies.push(names);
        }
      } else {
        array.allies = body.allies
      }
      await getConnection().createQueryBuilder().update(Character)
        .set({
          allies: array.allies
        }).where(`uuid = '${uuid}'`).execute();
    } catch (error) {
      throw new InternalServerErrorException(`This is the error: ${error}`);
    }
  }

  async addEnemies(uuid: string, body: AddAlliesDto) {
    try {
      let array = await this.getByUuid(uuid);
      if (array.enemies) {
        for(const names of body.enemies){
          array.enemies.push(names);
        }
      } else {
        array.enemies = body.enemies
      }
      await getConnection().createQueryBuilder().update(Character)
        .set({
          enemies: array.enemies
        }).where(`uuid = '${uuid}'`).execute();
    } catch (error) {
      throw new InternalServerErrorException(`This is the error: ${error}`);
    }
  }

  async addWeapons(uuid: string, body: AddAlliesDto) {
    try {
      let array = await this.getByUuid(uuid);
      if (array.weapons) {
        for(const names of body.weapons){
          array.weapons.push(names);
        }
      } else {
        array.weapons = body.weapons
      }
      await getConnection().createQueryBuilder().update(Character)
        .set({
          weapons: array.weapons
        }).where(`uuid = '${uuid}'`).execute();
    } catch (error) {
      throw new InternalServerErrorException(`This is the error: ${error}`);
    }
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
