import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class SkillEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    description!: string;
}
