
import { Application, Express, Response } from "express";
import { login } from "./auth/login";
import { skills } from "./skill";
import { projects } from "./project";
import employeesRouter from "./employee";
import { authMiddleware } from "./auth/authMiddleware";
import me from "./employee/me"

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("Skill Managment Server"); });
    app.use("/login", login);
    app.use("/me", authMiddleware, me)

    app.use("/employees", authMiddleware, employeesRouter);
    app.use("/projects", authMiddleware, projects);
    app.use("/skills", authMiddleware, skills);


}
