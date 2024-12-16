import Card from "./Card.tsx";
import CardAlt from "./CardAlt.tsx";
import SearchBar from "./SearchBar.tsx";

import type { CardProps } from "../models/CardProps.ts";
import CardAddNew from "./CardAddNew.tsx";
import { useState } from "react";


interface Props {
  cards: CardProps[];
  className?: string;
  href?: string;
  onItemSelection?: (id: number) => void;
  show: boolean;
  add?: boolean;
  onAdd?: () => void;
}

function PopupMenu({add, show: toggle, className, cards, href, onItemSelection, onAdd }: Props) {
  const [input, setInput] = useState("");
  function handleInput(input: string) {
    setInput(input);
    console.log(`el input ha cambiado: ${input}`);
  }

  return (
    <nav className={`z-10 fixed bg-primary w-full h-1/2 ${className} ${toggle ? "top-1/2" : "top-full"}`}>
      <SearchBar title="Titulo" onInput={handleInput}/>
      <section className="flex flex-wrap justify-between gap-y-4 gap-x-3 px-3 overflow-y-auto max-h-full">
        {add && <CardAddNew title="añadir nuevo" href={href} onAdd={onAdd} textColor="text-gray-400"/>}
        {cards.filter((card)=> card.title.includes(input)).map((card, index) => (
          <a href={card.href} key={index}>
            {card.icon !== undefined ? (
              <Card id={card.id} title={card.title} icon={card.icon} textColor="text-gray-400" onClick={onItemSelection}/>
            ) : (
              <CardAlt id={card.id} className="w-40" title={card.title} onClick={onItemSelection}/>
            )}
          </a>
        ))}
      </section>
    </nav>
  );
};

export default PopupMenu; 