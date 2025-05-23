import {
    Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './Project';
import { SkillEntity } from './Skill';

@Entity()
export class ProjectSkillEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ type: 'integer' })
    projectId!: string;

    @Column({ type: 'integer' })
    skillId!: string;

    @ManyToOne(() => ProjectEntity, (p) => p.requiredSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projectId' })
    project!: ProjectEntity;

    @ManyToOne(() => SkillEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skillId' })
    skill!: SkillEntity;

    @Column()
    level!: string;
}
