import { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Landing from "./components/Landing";
import NewProject from "./components/NewProject";

export type Task = { taskId: string; task: string };
export type ProjectType = {
  id: string;
  title: string;
  date: string;
  description: string;
  tasks: Task[];
};

export default function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );

  const [addProject, setAddProject] = useState<boolean>(false);

  function handleSelectProject(id: string) {
    setSelectedProject(projects.find((item) => item.id === id) || null);
    setAddProject(false);
  }

  function handleAddProject(project: ProjectType) {
    setProjects((prev) => [...prev, project]);
    setAddProject(false);
  }

  function handleDeleteProject(id: string) {
    setProjects((prev) => prev.filter((item) => item.id !== id));
    setSelectedProject(null);
  }

  function handleAddTask(id: string, task: Task) {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, tasks: [...item.tasks, task] } : item
      )
    );
    setSelectedProject((prev) => {
      return { ...prev, tasks: [...prev!.tasks, task] } as ProjectType;
    });
  }

  function handleRemoveTask(id: string, taskId: string) {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, tasks: item.tasks.filter((i) => i.taskId !== taskId) }
          : item
      )
    );

    setSelectedProject((prev) => {
      return {
        ...prev,
        tasks: prev?.tasks.filter((item) => item.taskId !== taskId),
      } as ProjectType;
    });
  }

  return (
    <div className="flex mt-20 flex-col sm:flex-row ">
      <Sidebar
        onAddProject={setAddProject}
        onSelect={handleSelectProject}
        projects={projects}
        selectedId={selectedProject?.id}
      />
      {addProject && (
        <NewProject onCancel={setAddProject} onAddProject={handleAddProject} />
      )}
      {selectedProject && !addProject && (
        <Main
          onAddTask={handleAddTask}
          onDeleteTask={handleRemoveTask}
          selectedProject={selectedProject}
          onDeleteProject={handleDeleteProject}
        />
      )}
      {!selectedProject && !addProject && (
        <Landing onAddProject={setAddProject} />
      )}
    </div>
  );
}
