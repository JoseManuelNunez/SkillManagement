import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm"
import { SkillEntity } from "./Skill"

@Entity()
export class EmployeeEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    postition: string

    @Column()
    role: "basic" | 'admin'

    @ManyToOne(() => SkillEntity, (skill) => skill)
    skills: SkillEntity[]

}
