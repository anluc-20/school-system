import BooksIcon from "./react/BooksIcon.tsx";
import FacebookIcon from "./react/FacebookIcon.tsx";
import TwitterIcon from "./react/TwitterIcon.tsx";
import UsersIcon from "./react/UsersIcon.tsx";
import NumbersIcon from "./react/NumbersIcon.tsx";
import SettingsIcon from "./react/SettingsIcon.tsx";
import SearchIcon from "./react/SearchIcon.tsx";
import BookIcon from "./react/BookIcon.tsx";
import ClipboardListIcon from "./react/ClipboardListIcon.tsx";
import RouteIcon from "./react/RouteIcon.tsx";
import CirclePlusIcon from "./react/CirclePlusIcon.tsx";
import QuestionIcon from "./react/QuestionIcon.tsx";
import CrossIcon from "./react/CrossIcon.tsx";
import React from "react";
import PlusIcon from "./react/PlusIcon.tsx";
import PencilIcon from "./react/PencilIcon.tsx";

export const iconMap: Record<string, React.ComponentType> = {
    books: BooksIcon,
    users: UsersIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    numbers: NumbersIcon,
    settings: SettingsIcon,
    search: SearchIcon,
    book: BookIcon,
    clipboard_list: ClipboardListIcon,
    route: RouteIcon,
    circle_plus: CirclePlusIcon,
    question: QuestionIcon,
    cross: CrossIcon,
    plus: PlusIcon,
    pencil: PencilIcon,
}


export function getIcon(name: string): React.ComponentType {
    try {
        return iconMap[name];
    } catch {
        console.error(`couldn't find icon '${name}'`);
        return iconMap["question"];
    }
}