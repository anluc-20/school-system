import Icon from './icons/Icon.tsx'

interface SearchBarProps {
  title: string;
  onInput: (value: string) => void;
}

function SearchBar ({ title, onInput }: SearchBarProps) {
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
        onChange={(e) =>onInput(e.target.value)}
      />
      <Icon name='search' className='size-8 p-1'/>
    </div>
  );
};

export default SearchBar; 