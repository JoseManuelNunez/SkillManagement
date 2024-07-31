export interface ISkill {
    id: string;
    name: string;
    description: string;
}

export interface IEmployee {
    id: string;
    name: string;
    position: string;
    password: string;
    role: "basic" | 'admin'
    skills: INewSkillEmployee[];
}

export interface IProject {
    id: string
    name: string
    description: string
    requiredSkills: INewSkillEmployee[]
    assignedEmployees: string[]

}


export interface INewSkillEmployee {
    skillId: string
    level: string
}