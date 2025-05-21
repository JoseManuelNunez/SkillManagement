import {
    Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './Project';
import { SkillEntity } from './Skill';

@Entity()
export class ProjectSkillEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer' })
    projectId!: number;

    @Column({ type: 'integer' })
    skillId!: number;

    @ManyToOne(() => ProjectEntity, (p) => p.projectSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projectId' })
    project!: ProjectEntity;

    @ManyToOne(() => SkillEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skillId' })
    skill!: SkillEntity;

    @Column()
    level!: string;
}
