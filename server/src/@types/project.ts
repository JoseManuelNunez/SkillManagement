import { INewSkillEmployee } from "./skill"

export interface IProject {
    id: string
    name: string
    description: string
    requiredSkills?: INewSkillEmployee[]
    assignedEmployees?: string[]
    status?: string

}
export interface INewSkillProject {
    projectId?: string
    skillId: string
    level: string
}

export type INewProject = Omit<IProject, 'id'>
