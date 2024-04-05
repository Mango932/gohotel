export default function ColorButton({ onClick, children, className }: any) {
    return (
        <div
            className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#e11d48] to-[#e11daa] group-hover:from-[#e11d48] group-hover:to-[#e11daa] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 ${className} cursor-pointer`}
        >
            <span
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full justify-center flex"
                onClick={onClick}
            >
                {children}
            </span>
        </div>
    );
}
