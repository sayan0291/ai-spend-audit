const varients = {
        solid: "bg-green text-white rounded-[9px] fl-jc-ic p-2",
        logoby: "text-[11px] text-ink-4 border-1 border-border-2 p-[2px_8px] rounded-lg bg-gray-200",
}

export const Icon = ({children,varient="solid"}) => {

    return(
        <div className={`${varients[varient]}`}>
            {children}
        </div>
    )
}