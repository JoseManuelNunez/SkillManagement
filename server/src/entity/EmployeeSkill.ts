import {
    Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeEntity } from './Employee';
import { SkillEntity } from './Skill';

@Entity()
export class EmployeeSkillEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ type: 'integer' })
    employeeId!: string;

    @Column({ type: 'integer' })
    skillId!: string;

    @ManyToOne(() => EmployeeEntity, (e) => e.skills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employeeId' })
    employee!: EmployeeEntity;

    @ManyToOne(() => SkillEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skillId' })
    skill!: SkillEntity;

    @Column()
    level!: string;
}
