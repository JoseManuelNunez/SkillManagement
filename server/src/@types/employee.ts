import { INewSkillEmployee } from "./skill";

export interface IEmployee {
    id: string;
    name: string;
    position: string;
    password: string;
    role: "basic" | 'admin'
    skills: INewSkillEmployee[];
}
