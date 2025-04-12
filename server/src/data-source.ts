import { DataSource } from "typeorm";
import { EmployeeEntity } from "./entity/Employee";
import { SkillEntity } from "./entity/Skill";

export const database = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "skillmanagement",
    synchronize: true,
    logging: true,
    entities: [EmployeeEntity, SkillEntity],
    subscribers: [],
    migrations: [],
})
