
import { Application, Express, Response } from "express";
import { login } from "./auth/login";
import { employees } from "./employee/employee";

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("Skill Managment Server"); });
    app.get("/employee", employees);
    app.post("/login", login);
}
