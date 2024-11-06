

interface Props {
	text: string,
	className?: string
}


export function Button({text, className}: Props) {
        document.documentElement.style
        return(
                <div className= {
                        `
                                bg-tertiary
                                flex justify-center items-center
                                rounded-3xl
                                border-b-[4px] border-[#0e858b] box-border
                                shadow-black/40 shadow-md
                                ${className}
                        `
                }>
                        <input type="button" value={text} className="bg-inherit"/>
                </div>
        )
}