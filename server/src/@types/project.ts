import { INewSkillEmployee } from "./skill"

export interface IProject {
    id: string
    name: string
    description: string
    requiredSkills: INewSkillEmployee[]
    assignedEmployees: string[]
    estado: string

}
export interface INewSkillProject {
    projectId?: string
    skillId: string
    level: string
}
