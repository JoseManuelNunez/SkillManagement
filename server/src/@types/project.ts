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
    skillId: string
    level: string
}
