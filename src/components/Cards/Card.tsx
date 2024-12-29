import Icon from '../icons/Icon.tsx'
import { type CardProps } from '../../models/CardProps.ts';

const defaultIcon = "question"

function Card({ id, title, className, icon, textColor, onClick}: CardProps) {
  return (
    <div className="flex flex-col items-center justify-between" onClick={() => onClick?.(id ?? -1)}>
      <div
        className={`
          bg-secondary 
          flex justify-center items-center
          rounded-3xl
          border-b-[6px] border-r-[6px] border-tertiary box-border
          shadow-black/40 shadow-md
        `}
      >
        <Icon name={icon? icon : defaultIcon} 
            className={`
                size-full text-white stroke-1
                ${className}
            `} 
        />
      </div>
      <p className={textColor} >{title}</p>
    </div>
  );
};

export default Card; 