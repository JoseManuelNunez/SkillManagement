export interface ISkill {
    id: string;
    name: string;
    description: string;
}

export interface IEmployee {
    id: string;
    name: string;
    position: string;
    skills: INewSkillEmployee[];
}

export interface IProject {
    id: string
    name: string
    description: string
    requiredSkills: {
        skillId: string
        level: string
    }[]
}


export interface INewSkillEmployee {
    skillId: string
    level: string
}