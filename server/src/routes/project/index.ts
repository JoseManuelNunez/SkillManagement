import { Request, Response, Router } from "express";
import { ProjectService } from "../../services/project";
import { INewSkillProject } from "../../@types/project";


const router = Router();

// GET /projects
router.get("/", async (req: Request, res: Response) => {
    try {
        const projectService = new ProjectService();
        res.send(await projectService.getAllProjects());

    } catch (error) {
        console.log(error)
        res.status(400).send({ error });
    }
});

// PUT addNewSkillRequired
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newSkills = req.body;
        const { employee } = req.user;

        if (!newSkills) throw new Error("Ingresa una skill");

        const projectService = new ProjectService()

        const project = await projectService.getProject(id)

        const employeeNewSkills: INewSkillProject = {
            projectId: project?.id,
            skillId: newSkills.skillId,
            level: newSkills.level
        }

        await projectService.addNewSkillRequired(employeeNewSkills)

        res.json(
            `La skill ${newSkills.skillId} a sido añadida correctamente al proyecto`
        )

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }

})

export default router;
