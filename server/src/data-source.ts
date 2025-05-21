import { DataSource } from "typeorm";
import { EmployeeEntity } from "./entity/Employee";
import { SkillEntity } from "./entity/Skill";
import { EmployeeSkillEntity } from "./entity/EmployeeSkill";
import { ProjectEntity } from "./entity/Project";
import { ProjectSkillEntity } from "./entity/ProjectSkill";

export const database = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "skillmanagement",
    synchronize: true,
    logging: true,
    entities: [EmployeeEntity, EmployeeSkillEntity, SkillEntity, ProjectEntity, ProjectSkillEntity],
    subscribers: [],
    migrations: [],
})
