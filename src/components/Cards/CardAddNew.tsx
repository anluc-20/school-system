import Card from "./Card";
import CardAlt from "./CardAlt"

interface CardAddNewProps {
  title: string;
  href?: string;
  className?: string;
  textColor?: string;
  onAdd?: ()=>void;
}

function CardAddNew({ title, href, className, textColor, onAdd}: CardAddNewProps) {
  return (
    <div className="basis-full flex justify-center">
        <a href={href} className="inline-block" onClick={onAdd}>
      <Card className={className} title={title} icon="circle_plus" textColor={textColor}/>
    </a>
    </div>
  );
};

export default CardAddNew; 