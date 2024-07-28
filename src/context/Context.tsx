import { createContext } from "react";
import { IEmployee, INewSkillEmployee, IProject, ISkill } from "./types";

interface IContext {
    skills: ISkill[]
    employee: IEmployee
    projects: IProject[]
    createNewSkill: (data: ISkill) => void
    employeeSkills: string[]
    addNewEmployeeSkill: (data: INewSkillEmployee) => void
    removeEmployeeSkill: (id: string) => void
    getSkill: () => void
}

export const Context = createContext({} as IContext)