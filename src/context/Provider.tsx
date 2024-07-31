import { useEffect, useState } from "react";
import { Context } from "./Context";
import { IEmployee, INewSkillEmployee, IProject, ISkill } from "./types";
import { showBasicAlert } from "../alerts/alerts";

export const Provider = ({ children }: { children: JSX.Element }) => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [employeeSkills, setEmployeeSkills] = useState<string[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [nivelFilter, setNivelFilter] = useState("");
  const [employee, setemployee] = useState<IEmployee>({
    id: "",
    name: "",
    position: "",
    password: "",
    role: "basic",
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
    if (employee.id !== '') return
    const token = await localStorage.getItem("token");
    if (!token) return
    const res = await fetch(`http://localhost:3000/employees/${JSON.parse(token)}`);
    await res.json().then(async (data) => {
      setemployee(data);
      const skillsE: string[] = await data.skills.map(
        (skill: INewSkillEmployee) => {
          return skill.skillId;
        }
      );
      setEmployeeSkills(skillsE);
    });
  };

  const getEmployees = async () => {
    const res = await fetch("http://localhost:3000/employees");
    await res.json().then(async (data) => {
      setEmployees(data);
    });
  };

  const addNewEmployeeSkill = async (newSkillEmployee: INewSkillEmployee) => {
    const token = await localStorage.getItem("token");
    if (!token) return
    const oldSkills: INewSkillEmployee[] = employee.skills;
    const employeeWithNewSkill: IEmployee = {
      ...employee,
      skills: [...oldSkills, newSkillEmployee],
    };
    await fetch(`http://localhost:3000/employees/${JSON.parse(token)}`, {
      method: "PUT",
      body: JSON.stringify(employeeWithNewSkill),
    }).then(() => {
      showBasicAlert(
        "Buen trabajo",
        `${employee.name} a añadido correctamente la skill`
      ),
        getEmployee();
    });
  };

  const addNewEmployeeInProject = async (
    idEmployee: string,
    idProject: string
  ) => {
    const oldTeam: IProject =
      projects.find((p) => p.id === idProject) ?? ({} as IProject);
    const newTeam: IProject = {
      ...oldTeam,
      assignedEmployees: [...oldTeam!.assignedEmployees, idEmployee],
    };

    await fetch(`http://localhost:3000/projects/${idProject}`, {
      method: "PUT",
      body: JSON.stringify(newTeam),
    });
  };

  const removeEmployeeSkill = async (id: string) => {
    const skills = employee.skills.filter((s) => s.skillId != id);
    const employeeWithNewSkill: IEmployee = { ...employee, skills: skills };
    await fetch("http://localhost:3000/employees/1", {
      method: "PUT",
      body: JSON.stringify(employeeWithNewSkill),
    }).then(() => {
      getEmployee();
    });
  };

  const createNewSkill = async (skill: ISkill) => {
    await fetch("http://localhost:3000/skills", {
      method: "POST",
      body: JSON.stringify(skill),
    })
      .then(
        () => (
          showBasicAlert(
            "Buen trabajo",
            "La skill a sido creada correctamente"
          ),
          getSkill()
        )
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getSkill();
    getProject();
    getEmployees();
    
  }, []);

  return (
    <Context.Provider
      value={{
        skills,
        employee,
        projects,
        createNewSkill,
        employeeSkills,
        employees,
        addNewEmployeeSkill,
        removeEmployeeSkill,
        getSkill,
        setSkillFilter,
        skillFilter,
        nivelFilter,
        setNivelFilter,
        addNewEmployeeInProject,
        getEmployee,
      }}
    >
      {children}
    </Context.Provider>
  );
};
