import { Request, Response, Router } from "express";
import { EmployeeService } from "../../services/employee";
import { IEmployee } from "../../@types/employee";

const router = Router();

// GET /employees
router.get("/", async (_, res: Response) => {
    try {
        const employeeService = new EmployeeService();
        const employees = await employeeService.getAllEmployees()
        res.send(employees);
    } catch (error) {
        res.status(400).send({ error });
    }
});

// GET /employees/:id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const employeeService = new EmployeeService();
        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
