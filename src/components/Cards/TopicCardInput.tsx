import { useState } from "react";
import { type TopicRequest } from "../../request/TopicRequest";
import AddButton from "../AddButton";
import { DeleteButton } from "../DeleteButton";
import type { CustomResponse } from "../../response/CustomResponse";
import { addTopic } from "../../services/topics";

interface Props {
  className?: string;
  onAdd?: (response: Promise<CustomResponse<number>>) => void;
  onCancel?: () => void;
}

function TopicCardInput({className, onAdd, onCancel}: Props) {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");

  function getTopicRequest(): TopicRequest {
    return {
      topic_name: topicName,
      description: description,
    }
  }
  function sendTopicRequest(): Promise<CustomResponse<number>> {
    return addTopic(getTopicRequest());
  }
  return (
    <div className={`
      flex flex-col
      gap-2
      ${className}
    `}>
      <div
        className={`
          bg-secondary 
          flex justify-center items-center flex-col
          rounded-3xl
          overflow-hidden
          border-b-[6px] border-r-[6px] border-tertiary box-border
          shadow-black/40 shadow-md
        `}
      >
        
        <div className="bg-tertiary w-full py-1 px-2">
          <input 
            onChange={(e) => setTopicName(e.target.value)}
            className='bg-inherit w-full max-w-full border-tertiary text-center'
            placeholder="topic name"/>
        </div>
        <div className="bg-secondary w-full py-1 px-2">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className='text-center bg-inherit field-sizing-content w-full max-w-full overflow-y-hidden'
            placeholder="description"/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <AddButton onAdd={() => onAdd?.(sendTopicRequest())}/>
        <DeleteButton onClick={onCancel}/>
      </div>
    </div>
  );
};

export default TopicCardInput; 