import Icon from "./icons/Icon";

interface CardAddNewProps {
  href?: string;
  className?: string;
  onAdd?: ()=>void;
}

function AddButton({ className, onAdd}: CardAddNewProps) {
  return (
    <button
        onClick={onAdd}
        className={`
          bg-tertiary 
          flex justify-center items-center
          rounded-full
          border-b-4 border-[#0e858b] box-border
          shadow-black/40 shadow-md
          ${className}
        `}
      >
        <Icon name='plus' 
            className={`
                size-fit text-black stroke-2
            `} 
        />
      </button>
  );
};

export default AddButton; 