import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SkillEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    description!: string;
}
