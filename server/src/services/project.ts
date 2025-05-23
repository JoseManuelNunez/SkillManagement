import { DataSource, IsNull, Not, Repository } from "typeorm";
import { ProjectEntity } from "../entity/Project";


export class ProjectService {
    private static repository: Repository<ProjectEntity>;

    public static init(database: DataSource) {
        ProjectService.repository = database.getRepository(ProjectEntity);
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
}
