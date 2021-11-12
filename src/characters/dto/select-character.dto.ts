import { IsNumber, IsOptional } from 'class-validator';

export class SelectCharacter {
    @IsOptional()
    @IsNumber()
    page: number;
}