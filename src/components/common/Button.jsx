const varients = {
    navLinkButtn: "text-ink-3 px-3 py-1.5 rounded-sm transition-colors duration-150 bg-surface-3 hover:bg-red-light font-body hover:text-ink",
    navButtn: "font-medium bg-ink text-[#FFF] px-3 py-1.5 rounded-sm transition-all duration-150 hover:bg-ink hover:-translate-y-[1px]",
    menuButtn: "text-green-dark antialiased absolute top-3 right-3 z-55",
    runBtn: "w-full mt-4 p-3 bg-green text-white border-none rounded-md font-body text-[clamp(9px,1.6vw,11px)] font-medium hover:bg-green-dark duration-150 shadow-md",
    emailSubmit: "bg-green text-white px-3 py-4 rounded-sm font-body font-medium",
    shareBtn: "bg-green-deeper text-white px-4 py-2 rounded-md hover:bg-green-dark duration-150",
    submitBtn: "w-full mt-2 py-3 bg-green hover:bg-green-dark text-surface font-semibold rounded-lg transition"
}

export const Button = ({varient="navButtn",children,...props}) => {
    return(
        <>
            <button className={`${varients[varient]} cursor-pointer`} {...props}>{children}</button>
        </>
    )
} 
