import { Entity, Column, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, } from 'typeorm';
import { ProjectSkillEntity } from './ProjectSkill';
import { EmployeeEntity } from './Employee';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column()
    status!: string;

    @OneToMany(() => ProjectSkillEntity, (ps) => ps.project, { cascade: true })
    requiredSkills!: ProjectSkillEntity[];

    @ManyToMany(() => EmployeeEntity)
    @JoinTable()
    assignedEmployees!: EmployeeEntity[];
}
