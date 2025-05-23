import express, { Express } from 'express';
import cors from 'cors';
import { Config } from './config';
import setupRoutes from './routes';
import { EmployeeService } from './services/employee';
import { SeederService } from './services/seeder';
import { SkillService } from './services/skill';
import { ProjectService } from './services/project';
import database from './data-source';


const app = express();

export async function getServer(): Promise<Express> {

    Config.init();

    const dataSource = await database().initialize();

    // Initialize services
    EmployeeService.init(dataSource);
    SkillService.init(dataSource);
    ProjectService.init(dataSource);
    SeederService.init(dataSource);

    // TODO: Morgan config

    const seederService = new SeederService();
    await seederService.fill();


    app.use(cors());
    app.use(express.json())
    setupRoutes(app);

    return app;
}
