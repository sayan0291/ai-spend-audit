const varients = {
        solid: "bg-green text-white rounded-[9px] fl-jc-ic p-2",
        logoby: "text-ink-4 border-1 border-border-2 rounded-4xl bg-gray-200 p-4",
        fetureIcon: "w-[44px] h-[44px] rounded-sm bg-green flex-jc-ic mb-5 text-amber-light"
}

export const Icon = ({children,varient="solid"}) => {

    return(
        <div className={`${varients[varient]}`}>
            {children}
        </div>
    )
}