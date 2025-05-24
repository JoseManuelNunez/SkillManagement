
import { Application, Express, Response } from "express";
import { login } from "./auth/login";
import { skills } from "./skill";
import { projects } from "./project";
import employeesRouter from "./employee";
import { authMiddleware } from "./auth/authMiddleware";

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("Skill Managment Server"); });
    app.use("/employees", authMiddleware, employeesRouter);
    app.use("/projects", projects);
    app.use("/skills", skills);
    app.use("/login", login);
}
