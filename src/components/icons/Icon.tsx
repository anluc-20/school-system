import { getIcon } from "./iconConfig";


interface IconProps {
    name: string;
    className?: string;
}

export default function Icon({ name, className }: IconProps) {
    const IconComponent = getIcon(name)
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <IconComponent />
        </svg>
    );
} 