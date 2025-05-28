interface IconListProps {
    name: string;
    iconPath: string;
}

// ① props 타입
interface SidebarProps {
    icons: IconListProps[];
}

function IconList({name, iconPath}: IconListProps) {
    return (
        <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path
                        d={iconPath}/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
                {/*<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>*/}
            </a>
        </li>
    )
}


export default function Sidebar({icons}: SidebarProps) {
    return (
        <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-15 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {icons.map((path, idx) => (
                        <IconList name={path.name} iconPath={path.iconPath}/>
                    ))}
                </ul>
            </div>
        </aside>
    );
}