import { Request, Response, Router } from "express";
import { SkillService } from "../../services/skill";
import { INewSkill } from "../../@types/skill";


const router = Router();

// GET /skills
router.get("/", async (_, res: Response) => {
    try {
        const skillService = new SkillService();
        res.send(await skillService.getAllSkills());

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});

// POST / create skills
router.post("/", async (req: Request, res: Response) => {
    try {

        const newSkill: INewSkill = req.body;
        const skillService = new SkillService();
        res.send(await skillService.createNewSkill(newSkill));

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});

export default router;
