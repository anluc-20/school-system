import Card from "./Card";
import CardAlt from "./CardAlt"
import Icon from "./icons/Icon";

interface EditButtonProps {
  href?: string;
  className?: string;
  onEdit?: ()=>void;
}

function EditButton({ href, className, onEdit}: EditButtonProps) {
  return (
    <button
        onClick={onEdit}
        className={`
          bg-orange-400
          flex justify-center items-center
          rounded-full
          border-b-4 border-[#d47a31] box-border
          shadow-black/40 shadow-md
          ${className}
        `}
      >
        <Icon name='pencil' 
            className={`
                size-fit text-black stroke-2
            `} 
        />
      </button>
  );
};

export default EditButton; 