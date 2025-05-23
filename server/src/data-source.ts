import { DataSource } from "typeorm";
import { EmployeeEntity } from "./entity/Employee";
import { SkillEntity } from "./entity/Skill";
import { EmployeeSkillEntity } from "./entity/EmployeeSkill";
import { ProjectEntity } from "./entity/Project";
import { ProjectSkillEntity } from "./entity/ProjectSkill";
import { Config } from "./config";


const database = () => {
    return new DataSource({
        type: "postgres",
        host: Config.databaseHost,
        port: Config.databasePort,
        username: Config.databaseUser,
        password: Config.databasePassword,
        database: Config.databaseName,
        synchronize: true,
        logging: true,
        entities: [EmployeeEntity, EmployeeSkillEntity, SkillEntity, ProjectEntity, ProjectSkillEntity],
    })
};

export default database
