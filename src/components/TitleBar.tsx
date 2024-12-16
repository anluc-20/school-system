import Icon from './icons/Icon.tsx'

interface TitleBarProps {
  title: string;
  icon: string;
}

function TitleBar ({ title, icon}: TitleBarProps) {
  return (
    <div className="
      flex justify-evenly space-x-5
      rounded-xl
      bg-secondary
      mx-auto w-fit px-2
      relative bottom-3
      border-tertiary box-border border-4
      text-white
    ">
      <input 
        className="text-white bg-inherit" 
        placeholder={title}
      />
      <Icon name={icon} className='size-8 p-1'/>
    </div>
  );
};

export default TitleBar; 