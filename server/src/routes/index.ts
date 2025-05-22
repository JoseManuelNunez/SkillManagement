
import { Application, Express, Response } from "express";
import { login } from "./auth/login";
import { employees } from "./employee/employee";
import { skills } from "./skill/skills";
import { projects } from "./project/project";

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("Skill Managment Server"); });
    app.get("/employee", employees);
    app.get("/projects", projects);
    app.get("/skills", skills);
    app.post("/login", login);
}
