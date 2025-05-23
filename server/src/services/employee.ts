import { DataSource, Repository } from "typeorm";
import { EmployeeEntity } from "../entity/Employee";
import bycrpt from "bcrypt";


export class EmployeeService {
    private static repository: Repository<EmployeeEntity>;

    public static init(database: DataSource) {
        EmployeeService.repository = database.getRepository(EmployeeEntity);
    }

    /**
   * getAll
   * @return {EmployeeEntity[]}
   */

    public async getAllEmployees(): Promise<EmployeeEntity[]> {
        return await EmployeeService.repository.find();
    }

    /**
  * getEmployeeById
  * @param {number} id
  * @return {EmployeeEntity | null}
  */

    public async getEmployeeById(id: number): Promise<EmployeeEntity | null> {
        console.log(id);
        return await EmployeeService.repository.findOne({
            where: { id },
            relations: ['employeeSkills']
        });
    }

    /**
   * getEmployeeByUsername
   * @param {string} username
   * @return {UserEntity | null}
   */

    public async getEmployeeByUsername(name: string): Promise<EmployeeEntity | null> {
        return await EmployeeService.repository.findOne({ where: { name } });
    }

    /**
   * comparePassword
   * @param {string} password
   * @param {string} hashedPassword
   * @return {boolean}
   */

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bycrpt.compare(password, hashedPassword);
    }

    public async login(username: string, password: string): Promise<EmployeeEntity | null> {

        // Instead of this use Zod
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const employee = await this.getEmployeeByUsername(username);
        if (!employee) {
            throw new Error("User not found");
        }

        const isPasswordValid = await this.comparePassword(password, employee.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return employee;
    }
}
