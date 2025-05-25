import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {

        const { employee } = req.user;

        if (!employee) {
            res.status(401).json({ error: "Not authenticated" });
        }

        res.json({
            name: employee.name,
            role: employee.role
        });

    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;
