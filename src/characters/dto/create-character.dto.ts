import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Element } from '../entities/character.entity';

export class CreateCharacterDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsIn([Element.AIR, Element.FIRE, Element.EARTH, Element.WATER, Element.NONE])
    element: Element;
}
