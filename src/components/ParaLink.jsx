import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const ParaLink = (props) => {
    return (
        <NavLink
            className="bg-gray-100 dark:bg-white/10 text-black dark:text-white px-4 py-1 font-[Open_Sans] font-med capitalize w-full rounded-sm text-center"
            to={props.target}
        >{props.content}</NavLink>
    )
}

export default ParaLink