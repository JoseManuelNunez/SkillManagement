import { Request, Response, Router } from "express";
import { EmployeeService } from "../../services/employee";
import { INewSkillEmployee } from '../../@types/skill';

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

router.put("/", async (req: Request, res: Response) => {
    try {
        const newSkills = req.body;
        const { employee } = req.user;

        const employeeService = new EmployeeService()

        const employeeNewSkills: INewSkillEmployee = {
            employeeId: employee.id,
            skillId: newSkills.skillId,
            level: newSkills.level
        }

        await employeeService.addNewEmployeeSkill(employeeNewSkills)

        res.json(
            `Buen trabajo ${employee.name} a añadido correctamente la skill`
        )

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Server error',
        });
    }

})

export default router;
