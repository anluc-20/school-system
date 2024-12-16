interface ButtonAltProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

function ButtonAlt({ text, className, onClick }: ButtonAltProps) {
    return (
        <button 
            title="hola" onClick={onClick}
            className={`
                bg-tertiary
                flex justify-center items-center
                rounded-3xl
                border-b-[4px] border-[#0e858b] box-border
                shadow-black/40 shadow-md
                overflow-hidden
                ${className}
            `}
        >
            {text}
        </button>
    );
}

export default ButtonAlt; 