const varients = {
    navLinkButtn: "text-ink-3 px-3 py-1.5 rounded-sm transition-colors duration-150 hover:bg-surface-3 hover:text-ink",
    navButtn: "font-medium bg-ink text-[#FFF] px-3 py-1.5 rounded-sm transition-all duration-150 hover:bg-ink hover:-translate-y-[1px]",
    menuButtn: "text-green-dark antialiased md:hidden",
    runBtn: "w-full mt-4 p-3 bg-green text-white border-none rounded-md font-body text-[clamp(9px,1.6vw,11px)] font-medium cursor-pointer hover:bg-green-dark duration-150 shadow-md"
}

export const Button = ({varient="navButtn",children}) => {
    return(
        <>
            <button className={`${varients[varient]}`}>{children}</button>
        </>
    )
}