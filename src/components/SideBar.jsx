import image from "../assets/deepak-image-01.jpg";
import Infinite from "../assets/Infinite.png";
import Sun from "../assets/Sun.png";
import trial from "../assets/Trial.png";
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ParaLink from "./ParaLink";
import GithubLogo from "../Svg/GithubLogo";
import TwitterLogo from "../Svg/TwitterLogo";

function SideBar() {
  return (
    <div className='w-[15vw] min-w- absolute top-0 left-0 z-40 overflow-hidden flex items-center h-screen flex-col bg-black/95 capitalize'>

      <div className="upperSection w-full h-[10%] p-4 flex items-center flex-col justify-between">
        <div className="w-full p-2 flex justify-between align-center">
          <p className="text-[1.3rem] font-med font-mono">TypeZ</p>
          <img src={Sun} alt="" className="bg-black/30 p-1 rounded-sm border-1 border-gray-400" />
        </div>
      </div>

      <div className='lowerSection w-full h-[75%] flex justify-start p-4 flex-col items-center gap-3'>

        <NavLink
          className="bg-white/10 text-[1em] px-4 py-1` font-[Open_Sans] font-med capitalize w-full flex items-center justify-around gap-3 rounded-sm border-b-1 border-gray-500"
          to='/infinite'
        >
          <img src={Infinite} alt="infinite logo png" className="h-3 bg-ambe0 fill-amber-50" />
          infinite mode</NavLink>

        <NavLink
          className="bg-white/10 px-4 py-1 font-[Open_Sans] font-med capitalize w-full flex items-center justify-around gap-3 rounded-sm"
          to='/'
        >
          <img src={trial} alt="infinite logo png" className="h-4 bg-ambe0 fill-amber-50" />
          trial mode
        </NavLink>


        <ParaLink target='/long-para' content={'long paragraph'} />

      </div>

      <div className='lowerSection w-full h-[15%] flex justify-start p-4 flex-col items-center gap-3'>

        <div>
          <p className="text-xs text-gray-300 text-center">Made with ❤️ by Deepak </p>
          <p className="text-xs text-gray-300 text-center"> © 2023 All rights reserved</p>
        </div>

        <div className="flex  gap-3">
          <a href="https://github.com/deepaksingh126" target="blank" className="p-1 rounded-sm bg-black/30 borer-1 border-gray-400">
            <TwitterLogo />
          </a>
          <a href="https://github.com/deepaksingh126" target="blank" className="p-1 rounded-sm bg-black/30 boder-1 border-gray-400">
            <GithubLogo />
          </a>
        </div>

      </div>
    </div>
  )
}

export default SideBar