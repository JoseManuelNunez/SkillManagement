import { useEffect, useState } from "react";
import { Context } from "./Context";
import { IEmployee, INewSkillEmployee, IProject, ISkill } from "./types";

export const Provider = ({ children }: { children: JSX.Element }) => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [employeeSkills, setEmployeeSkills] = useState<string[]>([]);
  const [employee, setemployee] = useState<IEmployee>({
    id: "",
    name: "",
    position: "",
    skills: [],
  });


  const getProject = async () => {
    const res = await fetch("http://localhost:3000/projects");
    const data = await res.json();
    setProjects(data);
  };

  const getSkill = async () => {
    const res = await fetch("http://localhost:3000/skills");
    const data = await res.json();
    setSkills(data);
  };

  const getEmployee = async () => {
    const res = await fetch("http://localhost:3000/employees/1");
    await res.json().then(  async (data) => {
      setemployee(data);
      const skillsE: string[] = await data.skills.map((skill: INewSkillEmployee) => {return skill.skillId})
    setEmployeeSkills(skillsE)

    })
  };

  const addNewEmployeeSkill = async (newSkillEmployee: INewSkillEmployee) => {
    const oldSkills: INewSkillEmployee[] = employee.skills
    const employeeWithNewSkill: IEmployee = {...employee, skills: [...oldSkills, newSkillEmployee] }
    await fetch("http://localhost:3000/employees/1", {
      method: "PUT",
      body: JSON.stringify(employeeWithNewSkill)
    }).then(() => {
      getEmployee()
    })
  }

  const removeEmployeeSkill = async (id: string) => {
    const skills = employee.skills.filter((s) => s.skillId != id)
    const employeeWithNewSkill: IEmployee = {...employee, skills: skills }
    await fetch("http://localhost:3000/employees/1", {
      method: "PUT",
      body: JSON.stringify(employeeWithNewSkill)
    }).then(() => {
      getEmployee()
    })
  }

  const createNewSkill = async (skill: ISkill)  => {
    await fetch("http://localhost:3000/skills", {
      method: "POST",
      body: JSON.stringify(skill)
    }).then(() => (
      getSkill()
    )).catch((error) => console.error(error))
  }

  useEffect(() => {
    getSkill();
    getEmployee();
    getProject();

  }, []);



  return (
    <Context.Provider
      value={{
        skills,
        employee,
        projects,
        createNewSkill,
        employeeSkills,
        addNewEmployeeSkill,
        removeEmployeeSkill,
        getSkill
      }}
    >
      {children}
    </Context.Provider>
  );
};
