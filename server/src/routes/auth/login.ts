import { Request, Response } from "express";
import { EmployeeService } from "../../services/employee";

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const employeeService = new EmployeeService();
        const employee = await employeeService.login(username, password);
        res.send(employee);
    } catch (error) {
        res.status(400).send({ error });
    }

}
