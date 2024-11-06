
import Card from "./Card.astro";
import CardAlt from "./CardAlt.astro";
import Icon from "./icons/Icon.astro";
import SearchBar from "./SearchBar.astro";
import { type SubjectCardResponse, SUBJECT_CARD_API_URL } from "./response/SubjectCard";
import { type CardData } from "../models/CardData";
import { useState } from "react";

interface Cards {
        title: string;
        href?: string;
        icon?: string;
}
interface Props {
        class?: string;
}

async function fetchCards(): Promise<CardData[]> {
        const response = await fetch(SUBJECT_CARD_API_URL).then((response) => response.json())
        const data: SubjectCardResponse[] = response.data
        const CARDS: CardData[] = data.map((card) => {
        return {
                title: card.subject_Name,
                icon: card.icon_Name
        }
        })
        return CARDS;
}

export function PopMenu({class: className} : Props) {
        const [cards, setCards] = useState<CardData[]>()
        addEventListener("popup", () => {setCardsAsync()})

        async function setCardsAsync() {
                const cards = await fetchCards()
                setCards(cards)
                console.log("he seteado las cards")
        }
        return (
                <nav className={`
                        fixed top-1/2 bg-primary
                        w-full h-full
                        ${className}
                `}>
                        <SearchBar title="Titulo" />
                        <section className="flex flex-wrap justify-evenly gap-y-4">
                                {
                                        cards?.map((card) => (
                                                <a href={card.href}>
                                                        
                                                </a>
                                        ))
                                }
                        </section>
                </nav>   
        );
}

