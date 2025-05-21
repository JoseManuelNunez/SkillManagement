import express, { Express } from 'express';
import cors from 'cors';
import { Config } from './config';
import setupRoutes from './routes';
import { database } from './data-source';
import { EmployeeService } from './services/employee';
import { SeederService } from './services/seeder';


const app = express();

export async function getServer(): Promise<Express> {

    Config.init();

    const dataSource = await database.initialize();

    // Initialize services
    EmployeeService.init(dataSource);
    SeederService.init(dataSource);

    // TODO: Morgan config

    const seederService = new SeederService();
    await seederService.fill();


    app.use(cors());
    app.use(express.json())
    setupRoutes(app);

    return app;
}
