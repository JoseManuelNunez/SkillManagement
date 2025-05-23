import { Request, Response } from "express";
import { ProjectService } from "../../services/project";

export async function projects(req: Request, res: Response) {
    try {
        const projectService = new ProjectService();
        res.send(await projectService.getAllProjects());

    } catch (error) {
        res.status(400).send({ error });
    }

}
