import { createContext } from "react";
import { IEmployee, INewSkillEmployee, INewSkillProject, IProject, ISkill } from "./types";

interface IContext {
    skills: ISkill[]
    employee: IEmployee
    projects: IProject[]
    createNewSkill: (data: ISkill) => void
    employeeSkills: string[]
    addNewEmployeeSkill: (data: INewSkillEmployee) => void
    removeEmployeeSkill: (id: string) => void
    getSkill: () => void
    employees: IEmployee[]
    setSkillFilter: (data: string) => void
    skillFilter: string
    nivelFilter: string 
    setNivelFilter: (data: string) => void
    addNewEmployeeInProject: (idEmployee: string, idProject: string) => void
    getEmployee: () => void
    addNewSkillRequire: (newSkill: INewSkillProject, idProject: string) => void
    removeSkillRequire: (skillId: string, projectId: string) => void
    removeEmployeeInProject: (idEmployee: string, idProject: string) => void
}

export const Context = createContext({} as IContext)