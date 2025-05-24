import { Request, Response } from "express";
import { EmployeeService } from "../../services/employee";
import jwt from 'jsonwebtoken';
import { Config } from "../../config";

export async function login(req: Request, res: Response) {

    try {
        const { username, password } = req.body;

        const employeeService = new EmployeeService();
        const employee = await employeeService.login(username, password);

        const token = jwt.sign({ employee }, Config.jwtSecret);

        res.send({ token });

    } catch (error) {
        res.status(401).send({ error });
    }

}
