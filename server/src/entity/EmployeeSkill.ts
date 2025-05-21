import {
    Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeEntity } from './Employee';
import { SkillEntity } from './Skill';

@Entity()
export class EmployeeSkillEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer' })
    employeeId!: number;

    @Column({ type: 'integer' })
    skillId!: number;

    @ManyToOne(() => EmployeeEntity, (e) => e.employeeSkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employeeId' })
    employee!: EmployeeEntity;

    @ManyToOne(() => SkillEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skillId' })
    skill!: SkillEntity;

    @Column()
    level!: string;
}
