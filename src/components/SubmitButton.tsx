interface SubmitButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

function SubmitButton({ text, className, onClick }: SubmitButtonProps) {
    return (
        <input
            type="submit"
            title="hola" 
            value={text}
            onClick={onClick}
            className={`
                bg-tertiary
                flex justify-center items-center
                rounded-3xl
                border-b-[4px] border-[#0e858b] box-border
                shadow-black/40 shadow-md
                overflow-hidden
                ${className}
            `}
        />
    );
}

export default SubmitButton; 