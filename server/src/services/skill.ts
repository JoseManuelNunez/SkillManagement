import { DataSource, IsNull, Not, Repository } from "typeorm";
import { SkillEntity } from "../entity/Skill";


export class SkillService {
    private static repository: Repository<SkillEntity>;

    public static init(database: DataSource) {
        SkillService.repository = database.getRepository(SkillEntity);
    }

    /**
   * getAll
   * @return {SkillEntity[]}
   */

    public async getAllSkills(): Promise<SkillEntity[]> {
        return await SkillService.repository.find();
    }
}
