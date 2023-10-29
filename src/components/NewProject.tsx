import { ChangeEvent, useState, FormEvent } from "react";
import { ProjectType } from "../App";
import Button from "./Button";

type ValueType = {
  title: string;
  description: string;
  date: string;
};

interface PropsType {
  onAddProject: (project: ProjectType) => void;
  onCancel: (i: false) => void;
}

export default function NewProject({ onAddProject, onCancel }: PropsType) {
  const [values, setValues] = useState<ValueType>({
    title: "",
    description: "",
    date: "",
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.title || !values.description || !values.date) return;
    const project = {
      ...values,
      id: crypto.randomUUID(),
      tasks: [],
    };
    onAddProject(project);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mx-4 lg:mx-auto pt-20 text-xl sm:w-full max-w-2xl "
    >
      <p className="flex gap-4 items-center justify-end">
        <button onClick={() => onCancel(false)} type="button">
          Cancel{" "}
        </button>

        <Button>Add</Button>
      </p>
      <p className="flex flex-col ">
        <label htmlFor="title" className="uppercase">
          Project Title
        </label>
        <input
          value={values.title}
          onChange={handleChange}
          name="title"
          type="text"
          id="title"
          required
          className="bg-stone-300 focus:outline-none border-b-2 focus:border-b-stone-900 py-1"
        />
      </p>
      <p className="flex flex-col ">
        <label htmlFor="description" className="uppercase">
          Description
        </label>
        <textarea
          value={values.description}
          onChange={handleChange}
          name="description"
          rows={5}
          id="description"
          required
          className="bg-stone-300 focus:outline-none border-b-2 focus:border-b-stone-900 py-1"
        />
      </p>
      <p className="flex flex-col ">
        <label htmlFor="date" className="uppercase">
          Date
        </label>
        <input
          value={values.date}
          onChange={handleChange}
          name="date"
          type="date"
          id="date"
          required
          className="bg-stone-300 focus:outline-none border-b-2 focus:border-b-stone-900 py-1"
        />
      </p>
    </form>
  );
}
