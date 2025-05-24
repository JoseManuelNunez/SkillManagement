import { Request, Response } from "express";
import { SkillService } from "../../services/skill";

export async function skills(req: Request, res: Response) {
    try {
        const skillService = new SkillService();
        res.send(await skillService.getAllSkills());

    } catch (error) {
        console.log(error);
        res.status(400).send({ error });
    }

}
