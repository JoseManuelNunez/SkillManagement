import { DataSource, IsNull, Not, Repository } from "typeorm";
import { ProjectEntity } from "../entity/Project";
import { ProjectSkillEntity } from "../entity/ProjectSkill";
import { INewSkillProject } from "../@types/project";
import { SkillEntity } from "../entity/Skill";
import { EmployeeEntity } from "../entity/Employee";


export class ProjectService {
    private static repository: Repository<ProjectEntity>;
    private static skillRepository: Repository<SkillEntity>;
    private static projectSkillRepository: Repository<ProjectSkillEntity>;
    private static employeeRepository: Repository<EmployeeEntity>;




    public static init(database: DataSource) {
        ProjectService.repository = database.getRepository(ProjectEntity);
        ProjectService.skillRepository = database.getRepository(SkillEntity);
        ProjectService.projectSkillRepository = database.getRepository(ProjectSkillEntity);
        ProjectService.employeeRepository = database.getRepository(EmployeeEntity);

    }

    /**
   * getAll
   * @return {SkillEntity[]}
   */

    public async getAllProjects(): Promise<ProjectEntity[]> {
        return await ProjectService.repository.find({
            relations: ['requiredSkills', 'assignedEmployees'],
            select: {
                requiredSkills: {
                    skillId: true,
                    level: true
                },
                assignedEmployees: {
                    id: true
                }
            }
        });
    }

    /**
   * getOne
   * @return {ProjectEntity[]}
   */

    public async getProject(id: string): Promise<ProjectEntity | null> {
        return await ProjectService.repository.findOne({
            where: { id },
            relations: ['requiredSkills', 'assignedEmployees'],
        });
    }

    /**
   * addNewSkillRequired
   * @param {INewSkillProject}
   * @return {ProjectSkillEntity}
   */

    public async addNewSkillRequired(newSkill: INewSkillProject): Promise<ProjectSkillEntity> {
        try {

            const { skillId, projectId } = newSkill
            const skill = await ProjectService.skillRepository.findOne({ where: { name: skillId } })

            if (!skill) throw new Error("Skill not found");

            const existingSkill = await ProjectService.projectSkillRepository.findOne({
                where: {
                    projectId: projectId,
                    skillId: skill?.id
                }
            });

            if (existingSkill) throw new Error("Project already has this skill");

            newSkill = {
                ...newSkill, skillId: skill?.id
            }
            console.log(newSkill)

            return await ProjectService.projectSkillRepository.save(newSkill);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
   * addNewSkillRequired
   * @param {string} idEmployee
   * @param {string} idProject
   * @return {ProjectEntity}
   */

    public async addNewEmployeeInProject(idEmployee: string, idProject: string,): Promise<ProjectEntity> {
        try {

            const project = await ProjectService.repository.findOne({
                where: { id: idProject },
                relations: ['assignedEmployees'],
            });

            if (!project) {
                throw new Error('Project not found');
            }

            const employee = await ProjectService.employeeRepository.findOne({
                where: { id: idEmployee },
            });

            if (!employee) {
                throw new Error('Employee not found');
            }

            const alreadyAssigned = project.assignedEmployees.some(
                (e) => e.id === idEmployee,
            );

            if (alreadyAssigned) throw new Error('Employee is already assigned to this project');

            project.assignedEmployees.push(employee);
            return await ProjectService.repository.save(project);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
  * removeEmployeeInProject
  * @param {string} idEmployee
  * @param {string} idProject
  * @return {ProjectEntity}
  */

    public async removeEmployeeInProject(
        idEmployee: string,
        idProject: string,
    ): Promise<ProjectEntity> {
        const project = await ProjectService.repository.findOne({
            where: { id: idProject },
            relations: ['assignedEmployees'],
        });

        if (!project) {
            throw new Error('Project not found');
        }

        const employeeIndex = project.assignedEmployees.findIndex(
            (e) => e.id === idEmployee,
        );

        if (employeeIndex === -1) {
            throw new Error('Employee is not assigned to this project');
        }

        project.assignedEmployees.splice(employeeIndex, 1);

        return await ProjectService.repository.save(project);
    }
}
