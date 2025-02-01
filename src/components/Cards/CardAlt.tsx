import { type CardProps } from '../../models/CardProps.ts';

function CardAlt({ id, title, className, onClick }: CardProps) {
  return (
    <div
      onClick={() => onClick?.(id ?? -1)}
      className={
        `
			bg-tertiary
			flex justify-center items-center
			rounded-3xl
			border-b-[4px] border-[#0e858b] box-border
			shadow-black/40 shadow-md
			${className}
		`
      }
    >
      <p className="text-center">{title}</p>
    </div>
  );
};

export default CardAlt; 