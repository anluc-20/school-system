import React from "react";
import SearchBar from "./SearchBar.tsx";
import { useState } from "react";

export interface BottomListItemProps{
  id: string;
  children: React.ReactNode;
}

export function BottomListItem({children}: BottomListItemProps) {
  return children;
}


interface Props {
  children?: React.ReactNode;
  className?: string;
  show: boolean;
  hidden?: boolean;
}

function BottomList({children, show, className, hidden}: Props) {
  const [input, setInput] = useState("");
  function handleInput(input: string) {
    setInput(input);
  }

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (React.isValidElement(child) && child.props.id) {
      return child.props.id.toLowerCase().includes(input.toLowerCase());
    }
    console.log("wrong")
    return false;
  });

  return (
    <nav className={`z-10 fixed bg-primary w-full h-1/2 ${className} ${show ? "top-1/2" : "top-full"} ${hidden && "hidden"}`}>
      <SearchBar title="Titulo" onInput={handleInput}/>
      <section className="flex flex-wrap justify-between gap-y-4 gap-x-3 px-3 pb-12 overflow-y-auto max-h-full">
        {filteredChildren}
      </section>
    </nav>
  );
};

export default BottomList; 