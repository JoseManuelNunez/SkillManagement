import jwt from 'jsonwebtoken';
import { Request, Response, Router } from "express";
import { EmployeeService } from "../../services/employee";
import { IEmployee } from "../../@types/employee";
import { Config } from '../../config';

const router = Router();

// GET /employees
router.get("/", async (req: Request, res: Response) => {
    try {

        const employeeService = new EmployeeService();
        const employees = await employeeService.getAllEmployees()

        if (!employees) {
            res.status(404).json({ message: 'Employees not found' });
        }

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
        console.log(employee)

        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        }

        res.json({
            id: employee?.id,
            name: employee?.name,
            position: employee?.position,
            role: employee?.role,
            password: employee?.password,
            skills: employee?.skills.map(skill => ({
                skillid: skill.skillId,
                level: skill.level
            }))
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
