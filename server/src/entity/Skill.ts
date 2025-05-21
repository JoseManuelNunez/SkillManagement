import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class SkillEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    description!: string;
}
