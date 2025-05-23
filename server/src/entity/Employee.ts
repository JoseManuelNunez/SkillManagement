import {
    Entity, PrimaryColumn, Column, OneToMany,
} from 'typeorm';
import { hashSync } from 'bcryptjs';
import { EmployeeSkillEntity } from './EmployeeSkill';

@Entity()
export class EmployeeEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    position!: string;

    @Column({ default: 'basic' })
    role!: 'basic' | 'admin';

    @Column()
    password!: string;

    @OneToMany(() => EmployeeSkillEntity, (es) => es.employee, { cascade: true })
    skills!: EmployeeSkillEntity[];

}
