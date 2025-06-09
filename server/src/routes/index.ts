
import { Application, Express, Response } from "express";
import { login } from "./auth/login";
import projectsRouter from "./project";
import employeesRouter from "./employee";
import skillsRouter from "./skill";
import { authMiddleware } from "./auth/authMiddleware";
import me from "./employee/me"

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("Skill Managment Server"); });
    app.use("/login", login);
    app.use("/me", authMiddleware, me)

    app.use("/employees", authMiddleware, employeesRouter);
    app.use("/projects", authMiddleware, projectsRouter);
    app.use("/skills", authMiddleware, skillsRouter);


}
