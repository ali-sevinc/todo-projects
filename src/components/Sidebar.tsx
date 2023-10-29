import { ProjectType } from "../App";
import Button from "./Button";

interface PropsType {
  projects: ProjectType[];
  onSelect: (id: string) => void;
  selectedId: string | undefined;
  onAddProject: (i: true) => void;
}

export default function Sidebar({
  projects,
  onSelect,
  selectedId,
  onAddProject,
}: PropsType) {
  return (
    <aside className="w-full md:w-96 bg-stone-900 text-stone-200 sm:rounded-tr-xl sm:min-h-screen flex flex-col gap-10 px-8 py-20 items-start">
      <h2 className="text-3xl font-reem uppercase">Your Projects</h2>
      <Button onClick={() => onAddProject(true)}>+Add Project</Button>
      <ul className="flex flex-col gap-4 text-xl w-full">
        {projects.map((project) => (
          <li
            onClick={() => onSelect(project.id)}
            key={project.id}
            className={`cursor-pointer py-1 px-2 rounded-md  ${
              selectedId === project.id ? "bg-stone-700" : ""
            }`}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
