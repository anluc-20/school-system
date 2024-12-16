interface TextInputProps {
    className?: string;
    placeholder?: string;
    onChange?: (input: string) => void;
    value?: string;
}

function TextInput({value, className, placeholder, onChange }: TextInputProps) {
    return (
        <div className={`
            bg-secondary
            rounded-lg
            border-b-4 border-tertiary
            p-1
            ${className}
        `}>
            <input
                type="text"
                placeholder={placeholder} 
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                
                className="bg-inherit text-gray-400 text-center w-full h-fit "
            />
        </div>
    );
}

export default TextInput; 