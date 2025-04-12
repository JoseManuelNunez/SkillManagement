
import { Application, Express, Response } from "express";
import { login } from "./auth/login";

export default function setupRoutes(app: Application) {
    app.get("/", (_, res: Response) => { res.json("OK"); });
    app.post("/login", login);
}
