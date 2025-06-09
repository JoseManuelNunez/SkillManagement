import { useEffect, useState } from "react";
import { Context } from "./Context";
import { IEmployee, INewSkillEmployee, INewSkillProject, IProject, ISkill } from "./types";
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
      getEmployee()
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
      getEmployees()
      getSkill()
      showBasicAlert(
        "Buen trabajo",
        `${employee.name} a añadido correctamente la skill`
      )
    });
  };

  const addNewSkillRequire = async (newSkill: INewSkillProject, idProject: string) => {
    const token = await localStorage.getItem("token")
    if (!token) return
    const proyecto: IProject = projects.find((p) => p.id === idProject) ?? ({} as IProject);
    const oldProjectSkills = proyecto.requiredSkills;
    const newProject: IProject = {
      ...proyecto,
      requiredSkills: [...oldProjectSkills, newSkill],
    };
    await fetch(`http://localhost:3000/projects/${idProject}`, {
      method: "PUT",
      body: JSON.stringify(newProject),
    }).then(() => {
      showBasicAlert(
        "Buen trabajo",
        "La skill a sido añadida correctamente al proyecto"
      );
      getProject();
    });
  }

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
    }).then(() => {
      getEmployees()
      getProject()
      getSkill()
      showBasicAlert(
        "Buen trabajo",
        "La skill a sido añadida correctamente al proyecto"
      );
    })
  };

  const removeEmployeeInProject = async (idEmployee: string, idProject: string) => {
    const oldTeam: IProject = projects.find((p) => p.id === idProject) ?? ({} as IProject);
    const newTeam: IProject = {
      ...oldTeam,
      assignedEmployees: oldTeam.assignedEmployees.filter((e) => e !== idEmployee)
    }
    await fetch(`http://localhost:3000/projects/${idProject}`, {
      method: "PUT",
      body: JSON.stringify(newTeam)
    }).then(() => {
      getProject()
    })
  }

  const removeEmployeeSkill = async (id: string) => {
    const skills = employee.skills.filter((s) => s.skillId != id);
    const employeeWithNewSkill: IEmployee = { ...employee, skills: skills };
    await fetch("http://localhost:3000/employees/1", {
      method: "PUT",
      body: JSON.stringify(employeeWithNewSkill),
    }).then(() => {
      getEmployees();
      getEmployee()
    });
  };

  const removeSkillRequire = async (skillId: string, projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    const newSkills = project?.requiredSkills.filter(
      (skill) => skill.skillId !== skillId
    );
    const newProject = { ...project, requiredSkills: newSkills };
    await fetch(`http://localhost:3000/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(newProject),
    }).then(() => {
      showBasicAlert(
        "Buen trabajo",
        "La skill a sido eliminada correctamente del proyecto"
      );
      getProject();
    });
  }

 

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

  const createNewProject = async (project: IProject) => {
    await fetch("http://localhost:3000/projects", {
      method: "POST",
      body: JSON.stringify(project),
    })
      .then(
        () => (
          showBasicAlert(
            "Buen trabajo",
            "El proyecto a sido registrado correctamente"
          ),
          getProject()
        )
      )
      .catch((error) => console.error(error));
  };

  const changeProjectStatus = async (id: string, status: string) => {
    console.log(id, status);
    const project = projects.find((p) => p.id === id);
    const newProject = { ...project, estado: status };
    console.log("estoy aqui compay",newProject);
    await fetch(`http://localhost:3000/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(newProject),
    }).then(() => {
      showBasicAlert(
        "Buen trabajo",
        "El estado del proyecto a sido cambiado correctamente"
      );
      getProject();
    });
  }


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
        addNewSkillRequire,
        removeSkillRequire,
        removeEmployeeInProject,
        createNewProject,
        getProject,
        changeProjectStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};
