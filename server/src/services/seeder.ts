import bcrypt from 'bcrypt';
import { Config } from '../config';
import { DataSource, Repository } from "typeorm";
import { EmployeeEntity } from "../entity/Employee";
import * as fs from 'fs';
import { SkillEntity } from '../entity/Skill';
import { EmployeeSkillEntity } from '../entity/EmployeeSkill';
import { ProjectEntity } from '../entity/Project';
import { ProjectSkillEntity } from '../entity/ProjectSkill';

export class SeederService {
    private static employeeRepository: Repository<EmployeeEntity>;
    private static skillRepository: Repository<SkillEntity>;
    private static employeeSkillRepository: Repository<EmployeeSkillEntity>;
    private static projectRepository: Repository<ProjectEntity>;
    private static projectSkillRepository: Repository<ProjectSkillEntity>;

    public static init(database: DataSource) {
        SeederService.employeeRepository = database.getRepository(EmployeeEntity);
        SeederService.skillRepository = database.getRepository(SkillEntity);
        SeederService.employeeSkillRepository = database.getRepository(EmployeeSkillEntity);
        SeederService.projectRepository = database.getRepository(ProjectEntity);
        SeederService.projectSkillRepository = database.getRepository(ProjectSkillEntity);
    }

    public async fill() {

        const count = await SeederService.employeeRepository.count();

        if (Config.env == 'DEV' && count == 0) {

            const rawData = fs.readFileSync('/Users/sebastiancorcino/dev/SkillManagement/server/src/seeder/seed-data.json', 'utf-8');
            const data = JSON.parse(rawData);

            for (const skillData of data.skills) {
                const skill = SeederService.skillRepository.create({
                    id: skillData.id,
                    name: skillData.name,
                    description: skillData.description
                });
                await SeederService.skillRepository.save(skill);
            }

            for (const employeeData of data.employees) {
                const hashedPassword = await bcrypt.hash(employeeData.password, 10);
                const employee = SeederService.employeeRepository.create({
                    id: employeeData.id,
                    name: employeeData.name,
                    position: employeeData.position,
                    role: employeeData.role,
                    password: hashedPassword
                });
                await SeederService.employeeRepository.save(employee);

                for (const skill of employeeData.skills) {
                    const employeeSkill = SeederService.employeeSkillRepository.create({
                        employeeId: employee.id,
                        skillId: skill.skillId,
                        level: skill.level
                    });
                    await SeederService.employeeSkillRepository.save(employeeSkill);
                }
            }

            for (const projectData of data.projects) {
                const project = SeederService.projectRepository.create({
                    id: projectData.id,
                    name: projectData.name,
                    description: projectData.description,
                    status: projectData.status
                });
                await SeederService.projectRepository.save(project);

                for (const requiredSkill of projectData.requiredSkills) {
                    const projectSkill = SeederService.projectSkillRepository.create({
                        projectId: projectData.id,
                        skillId: requiredSkill.skillId,
                        level: requiredSkill.level
                    });
                    await SeederService.projectSkillRepository.save(projectSkill);
                }

                const assignedEmployees = [];
                for (const employeeId of projectData.assignedEmployees) {
                    const employee = await SeederService.employeeRepository.findOneBy({
                        id: employeeId
                    });
                    if (employee) {
                        assignedEmployees.push(employee);
                    }
                }
                project.assignedEmployees = assignedEmployees;
                await SeederService.projectRepository.save(project);
            }
        }

    }
}
