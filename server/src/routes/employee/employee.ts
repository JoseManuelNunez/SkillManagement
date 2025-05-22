import { Request, Response } from "express";
import { EmployeeService } from "../../services/employee";

export async function employees(req: Request, res: Response) {
    try {
        const employeeService = new EmployeeService();
        res.send(await employeeService.getAllEmployees());
    } catch (error) {
        res.status(400).send({ error });
    }

}
