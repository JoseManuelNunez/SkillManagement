import express, { Express } from 'express';
import cors from 'cors';
import { Config } from './config';
import setupRoutes from './routes';
import { database } from './data-source';
import { EmployeeService } from './services/employee';

const app = express();

export async function getServer(): Promise<Express> {

    Config.init();

    const dataSource = await database.initialize();

    // Initialize services
    EmployeeService.init(dataSource);

    app.use(cors());
    app.use(express.json())
    setupRoutes(app);

    return app;
}
