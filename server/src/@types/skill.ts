export interface ISkill {
    id: string;
    name: string;
    description: string;
}

export interface INewSkillEmployee {
    employeeId: string
    skillId?: string
    level: string
}

export type INewSkill = Omit<ISkill, 'id'>;
