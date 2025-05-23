import { EmployeeService } from "../../services/employee";
import { Request, Response, Router } from "express";

const router = Router();

// GET /employees
router.get("/", async (_, res: Response) => {
    try {
        const employeeService = new EmployeeService();
        res.send(await employeeService.getAllEmployees());
    } catch (error) {
        res.status(400).send({ error });
    }
});

// GET /employees/:id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const employeeService = new EmployeeService();
        const { id } = req.params;
        console.log(id)
        const employee = await employeeService.getEmployeeById(parseInt(id));
        console.log(employee);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
