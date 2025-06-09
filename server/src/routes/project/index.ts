import { Request, Response, Router } from "express";
import { ProjectService } from "../../services/project";
import { INewProject, INewSkillProject } from "../../@types/project";


const router = Router();

// GET /projects
router.get("/", async (req: Request, res: Response) => {
    try {
        const projectService = new ProjectService();
        res.send(await projectService.getAllProjects());

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});

// POST / create project
router.post("/", async (req: Request, res: Response) => {
    try {

        const newProject: INewProject = req.body;
        const projectService = new ProjectService();
        res.send(await projectService.createNewProject(newProject));

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});

// POST addNewSkillRequired
router.post("/add-skill/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newSkills = req.body;

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

// POST removeSkillRequired
router.post("/remove-skill/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { skillId } = req.body;

        if (!skillId) throw new Error("Ingresa una skill");

        const projectService = new ProjectService()
        res.send(await projectService.removeSkillRequired(id, skillId))

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
})

// POST assignEmployees
router.post("/assign-employee/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { employeeId } = req.body;

        const projectService = new ProjectService();
        res.send(await projectService.addNewEmployeeInProject(employeeId, id));

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});


// POST removeEmployees
router.delete("/remove-employee/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { employeeId } = req.body;

        const projectService = new ProjectService();
        res.send(await projectService.removeEmployeeInProject(employeeId, id));

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});


// POST change project status
router.post("/status/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const projectService = new ProjectService();
        res.send(await projectService.changeProjectStatus(id, status));

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }
});

export default router;
