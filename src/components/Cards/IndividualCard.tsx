export interface IndividualProps {
    id: number,
    firstName: string,
    lastName: string,
    onClick?: (id: number) => void;
}

function IndividualCard({
    id,
    firstName,
    lastName,
    onClick,
}: IndividualProps) {
    return (
        <div className={
        `
            grid grid-cols-5 grid-flow-col
            bg-tertiary
            p-1
            border-b-2 border-[#0d7b81] rounded-lg 
            w-full
        `}>
            <p className="col-start-1 col-span-1">{id}</p>
            <p className="box-border border-[#0d7b81] border-l-2 pl-1 col-start-2 col-span-2">{lastName}</p>
            <p className="box-border border-[#0d7b81] border-l-2 pl-1 col-start-4 col-span-2">{firstName}</p>
        </div>
    );
}

export default IndividualCard;