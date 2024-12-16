import Icon from "./icons/Icon";

interface Props {
    onClick?: () => void;
    className?: string;
}

export function DeleteButton({onClick, className}: Props) {
    return (
        <button
        onClick={onClick}
        className={` 
            bg-red-400
            rounded-xl
            border-b-4 border-[#ca5b5b] box-border
            flex justify-center items-center
            ${className}
        `}>
            <Icon name="cross" className="size-fit stroke-2"/>
        </button>
    )
}