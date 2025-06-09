import { NavLink } from 'react-router-dom'

const ParaLink = (props) => {
    return (
        <NavLink
            className={`bg-gray-100 dark:bg-white/10 text-black dark:text-white px-4 py-1 font-[Open_Sans] font-med capitalize w-full flex items-center justify-around gap-3 rounded-sm text-center ${props.className}`}
            to={props.target}
        // {props.func}
        >
            {props.icon}
            {props.content}</NavLink>
    )
}

export default ParaLink