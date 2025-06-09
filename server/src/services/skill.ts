import { DataSource, IsNull, Not, Repository } from "typeorm";
import { SkillEntity } from "../entity/Skill";
import { INewSkill } from "../@types/skill";


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

    /**
     * createNewSkill
     * @param {ISkill} skill
     * @returns {SkillEntity}
     */
    public async createNewSkill(skill: INewSkill): Promise<SkillEntity> {
        try {
            const existing = await SkillService.repository.findOne({
                where: { name: skill.name }
            });

            if (existing) {
                throw new Error("Skill already exists");
            }

            return await SkillService.repository.save(skill);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
