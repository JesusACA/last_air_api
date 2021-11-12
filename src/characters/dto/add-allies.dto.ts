import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
export class AddAlliesDto {
    @IsOptional()
    @IsArray()
    allies: string[]
    @IsOptional()
    @IsArray()
    enemies: string[]
    @IsOptional()
    @IsArray()
    weapons: string[]
        

}