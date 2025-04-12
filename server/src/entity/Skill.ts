import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { EmployeeEntity } from "./Employee";

@Entity()
export class SkillEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => EmployeeEntity, (employee) => employee.skills, {
        nullable: true,
        onDelete: 'CASCADE',
      })
      employee: EmployeeEntity;

}
