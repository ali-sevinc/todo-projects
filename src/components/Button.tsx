import { ReactNode } from "react";
interface PropsType {
  children: ReactNode;
  onClick?: () => void;
}
export default function Button({ children, onClick }: PropsType) {
  return (
    <button
      onClick={onClick}
      className="bg-stone-700 text-stone-200 text-xl px-6 py-2 rounded-md hover:bg-stone-800 duration-150"
    >
      {children}
    </button>
  );
}
