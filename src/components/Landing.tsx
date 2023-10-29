import Button from "./Button";
import logo from "/logo.png";
export default function Landing({
  onAddProject,
}: {
  onAddProject: (i: true) => void;
}) {
  return (
    <section className="flex flex-col items-center gap-8 w-3/4 max-w-4xl pt-24 mx-auto ">
      <img src={logo} alt="Paper with a pencil." className="w-24" />
      <h1 className="text-4xl font-bold">No Project Selected</h1>
      <p className="text-lg">Select a project or get started with a new one</p>

      <Button onClick={() => onAddProject(true)}>Create new project</Button>
    </section>
  );
}
