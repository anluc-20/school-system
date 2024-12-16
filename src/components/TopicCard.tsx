import { type TopicCardProps } from '../models/TopicCardProps.ts';
import { DeleteButton } from './DeleteButton.tsx';
import EditButton from './EditButton.tsx';

function TopicCard({ topic_id, topic_name, description, onClick, onDelete, onEdit, relationship_id, showExtra}: TopicCardProps) {
  return (
    <>
    {onEdit && <EditButton onEdit={() => onEdit(topic_id)} className='absolute top-6 left-6'/>}
    <div
      onClick={() => onClick?.(topic_id)}
        className={`
          bg-secondary 
          flex justify-center items-center flex-col
          rounded-3xl
          overflow-hidden
          border-b-[6px] border-r-[6px] border-tertiary box-border
          shadow-black/40 shadow-md
        `}
      >
        
        <p className='bg-tertiary w-full border-tertiary text-center'>{topic_name}</p>
        <p className={`text-center m-1 ${showExtra ? "max-h-full":"max-h-40"}
          overflow-hidden`}>{description}</p>
    </div>
    </>
    
  );
};

export default TopicCard; 