import { useRef } from "react";
import { ProjectType, Task } from "../App";

interface PropsType {
  selectedProject: ProjectType;
  onDeleteTask: (id: string, taskId: string) => void;
  onAddTask: (id: string, task: Task) => void;
  onDeleteProject: (id: string) => void;
}

export default function Main({
  selectedProject,
  onDeleteTask,
  onAddTask,
  onDeleteProject,
}: PropsType) {
  const taskRef = useRef<HTMLInputElement>(null);

  function handleAdd() {
    const task = taskRef.current?.value;
    if (!task?.length) return;
    onAddTask(selectedProject.id, { taskId: Math.random().toString(), task });
    taskRef.current!.value = "";
  }

  return (
    <section className="px-10 pt-20 flex flex-col mx-auto gap-4 w-full sm:w-3/4 max-w-4xl">
      <div className="border-b-2 border-b-stone-300 flex flex-col gap-4 pb-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{selectedProject.title}</h1>
          <button onClick={() => onDeleteProject(selectedProject.id)}>
            Delete
          </button>
        </div>
        <time className="italic text-stone-500">{selectedProject.date}</time>
        <p className="text-xl">{selectedProject.description}</p>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-4">
          <h2 className="text-3xl font-bold">Tasks</h2>
          <p className="text-xl">
            <input
              ref={taskRef}
              type="text"
              className="bg-stone-300 mr-4 focus:outline-none border-b-2 focus:border-b-stone-900"
            />
            <button onClick={handleAdd}>Add Task</button>
          </p>
        </div>
        {selectedProject.tasks.length === 0 && (
          <p className="text-center text-2xl pt-8">Add new task.</p>
        )}
        {selectedProject.tasks.length > 0 && (
          <ul className="flex flex-col gap-2 text-lg">
            {selectedProject.tasks.map((item) => (
              <li
                key={item.taskId}
                className="p-8 bg-stone-300 flex justify-between"
              >
                <span>{item.task}</span>
                <button
                  onClick={() => onDeleteTask(selectedProject.id, item.taskId)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
