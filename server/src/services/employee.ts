import { DataSource, Repository } from "typeorm";
import { EmployeeEntity } from "../entity/Employee";
import bycrpt from "bcrypt";
import { INewSkillEmployee } from "../@types/skill";
import { EmployeeSkillEntity } from "../entity/EmployeeSkill";
import { SkillEntity } from "../entity/Skill";


export class EmployeeService {
    private static repository: Repository<EmployeeEntity>;
    private static employeeSkillRepository: Repository<EmployeeSkillEntity>;
    private static skillRepository: Repository<SkillEntity>;



    public static init(database: DataSource) {
        EmployeeService.repository = database.getRepository(EmployeeEntity);
        EmployeeService.employeeSkillRepository = database.getRepository(EmployeeSkillEntity);
        EmployeeService.skillRepository = database.getRepository(SkillEntity);
    }

    /**
   * getAll
   * @return {EmployeeEntity[]}
   */

    public async getAllEmployees(): Promise<EmployeeEntity[]> {
        return await EmployeeService.repository.find({
            relations: ['skills'],
            select: {
                skills: {
                    skillId: true,
                    level: true
                }
            }

        });
    }

    /**
  * getEmployeeById
  * @param {number} id
  * @return {EmployeeEntity | null}
  */

    public async getEmployeeById(id: string): Promise<EmployeeEntity | null> {
        return await EmployeeService.repository.findOne({
            where: { id },
            relations: ['skills']
        });
    }

    /**
   * getEmployeeByUsername
   * @param {string} username
   * @return {UserEntity | null}
   */

    public async getEmployeeByUsername(name: string): Promise<EmployeeEntity | null> {
        return await EmployeeService.repository.findOne({ where: { name } });
    }

    /**
  * addNewEmployeeSkill
  * @param {INewSkillEmployee}
  * @return {boolean}
  */

    public async addNewEmployeeSkill(newSkillEmployee: INewSkillEmployee): Promise<EmployeeSkillEntity> {
        try {

            const { skillId, employeeId } = newSkillEmployee
            const skill = await EmployeeService.skillRepository.findOne({ where: { name: skillId } })

            if (!skill) throw new Error("Skill not found");

            const existingSkill = await EmployeeService.employeeSkillRepository.findOne({
                where: {
                    employeeId: employeeId,
                    skillId: skill?.id
                }
            });

            if (existingSkill) throw new Error("Employee already has this skill");

            newSkillEmployee = {
                ...newSkillEmployee, skillId: skill?.id
            }

            return await EmployeeService.employeeSkillRepository.save(newSkillEmployee);
        } catch (error: any) {
            throw new Error(error.message);
        }

    }

    public async removeEmployeeSkill(employeeId: string, skillId: string,): Promise<EmployeeSkillEntity> {
        try {

            const employee = await EmployeeService.repository.findOne({
                where: { id: employeeId },
                relations: ['skills'],
            });

            if (!employee) {
                throw new Error('Employee not found');
            }

            const skillToRemove = employee.skills.find((s) => s.skillId === skillId);

            if (!skillToRemove) {
                throw new Error('Skill not assigned to this employee');
            }

            return await EmployeeService.employeeSkillRepository.save(skillToRemove);

        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    /**
   * comparePassword
   * @param {string} password
   * @param {string} hashedPassword
   * @return {boolean}
   */

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bycrpt.compare(password, hashedPassword);
    }

    public async login(username: string, password: string): Promise<EmployeeEntity> {

        // REMEMBER TO USE ZOD instead of this validations
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const employee = await this.getEmployeeByUsername(username);
        if (!employee) {
            throw new Error("User not found");
        }

        const isPasswordValid = await this.comparePassword(password, employee.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return employee;
    }

}
