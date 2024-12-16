import Icon from "./icons/Icon.tsx";

interface Props {
  title: string;
  className?: string;
  iconName?: string;
  onClick?: () => void;
}

const IconPicker = ({ title, className, iconName, onClick }: Props) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-between
        ${className}
      `}
    >
      <button
        onClick={onClick}
        className={`
          bg-secondary 
          flex justify-center items-center
          rounded-3xl
          border-b-[6px] border-r-[6px] border-tertiary box-border
          shadow-black/40 shadow-md
          size-28
          cursor-pointer
          hover:opacity-90
          transition-opacity
        `}
      >
        {iconName !== undefined && (
          <Icon name={iconName} className="size-full p-5 text-white stroke-1" />
        )}
      </button>

      <p>{title}</p>
    </div>
  );
};

export default IconPicker; 