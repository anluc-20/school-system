interface TextAreaInputProps {
    className?: string;
    placeholder?: string;
    onChange?: (input: string) => void;
    value?: string;
}

function TextAreaInput({value, className, placeholder, onChange }: TextAreaInputProps) {
    return (
        <div className={`
            bg-secondary
            rounded-lg
            border-b-4 border-tertiary
            p-1
            ${className}
        `}>
            <textarea 
                placeholder={placeholder} 
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
                
                className="bg-inherit text-gray-400 text-center w-full h-fit "
            />
        </div>
    );
}

export default TextAreaInput; 