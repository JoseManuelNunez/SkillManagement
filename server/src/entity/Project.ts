import {
    Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import { ProjectSkillEntity } from './ProjectSkill';
import { EmployeeEntity } from './Employee';

@Entity()
export class ProjectEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column()
    status!: string;

    @OneToMany(() => ProjectSkillEntity, (ps) => ps.project, { cascade: true })
    projectSkills!: ProjectSkillEntity[];

    @ManyToMany(() => EmployeeEntity, { eager: true })
    @JoinTable()
    assignedEmployees!: EmployeeEntity[];
}
