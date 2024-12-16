interface TextInputProps {
    className?: string;
    placeholder?: string;
    onChange?: (input: number) => void;
}

function NumberInput({ className, placeholder, onChange }: TextInputProps) {
    return (
        <div className={`
            bg-secondary
            rounded-lg
            border-b-4 border-tertiary
            p-1
            ${className}
        `}>
            <input
                type="number"
                title="Ingrese un año valido"
                placeholder={placeholder} 
                onChange={(e) => onChange?.(e.target.valueAsNumber)}
                className="bg-inherit text-gray-400 text-center size-full"
            />
        </div>
    );
}

export default NumberInput; 