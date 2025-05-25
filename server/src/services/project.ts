import { DataSource, IsNull, Not, Repository } from "typeorm";
import { ProjectEntity } from "../entity/Project";
import { ProjectSkillEntity } from "../entity/ProjectSkill";
import { INewSkillProject } from "../@types/project";
import { SkillEntity } from "../entity/Skill";


export class ProjectService {
    private static repository: Repository<ProjectEntity>;
    private static skillRepository: Repository<SkillEntity>;
    private static projectSkillRepository: Repository<ProjectSkillEntity>;



    public static init(database: DataSource) {
        ProjectService.repository = database.getRepository(ProjectEntity);
        ProjectService.skillRepository = database.getRepository(SkillEntity);
        ProjectService.projectSkillRepository = database.getRepository(ProjectSkillEntity);
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
}
