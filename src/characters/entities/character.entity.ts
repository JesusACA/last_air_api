import {BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Element{
    FIRE = 'FIRE',
    WATER = 'WATER',
    EARTH = 'EARTH',
    AIR = 'AIR',
    NONE = 'NONE'
}

@Entity('characters')
export class Character extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column({unique: true})
    name: string;
    @Column({
        type: 'enum',
        enum: Element,
        default: Element.NONE
    })
    element: Element;
    @Column("text", { array: true, nullable: true})
    allies: string[];
    @Column("text", {array: true, nullable: true})
    weapons: string[];
    @Column("text", {array: true, nullable: true})
    enemies: string[];
    @Column({default: ''})
    photo: string;
}
