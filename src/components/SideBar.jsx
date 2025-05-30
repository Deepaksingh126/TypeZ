import image from "../assets/deepak-image-01.jpg";
import Infinite from "../assets/Infinite.png";
import Sun from "../assets/Sun.png";
import trial from "../assets/Trial.png";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ParaLink from "./ParaLink";
import GithubLogo from "../Svg/GithubLogo";
import TwitterLogo from "../Svg/TwitterLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[99] sm:z-40 bg-black/95 p-2 rounded focus:outline-none text-2xl md:text-3xl"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>

      <div
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col items-center bg-black sm:bg-black/95 capitalize transition-transform duration-300 ease-in-out
          w-[70vw] sm:w-[40vw] lg:w-[15vw] min-w-[200px] max-w-[320px]
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="upperSection w-full h-[10%] p-4 flex items-center flex-col justify-between mt-8 sm:mt-0">
          <div className="w-full p-2 flex justify-between align-center">
            <p className="text-[1.3rem] font-med font-mono">TypeZ</p>
            <img
              src={Sun}
              alt=""
              className="bg-black/30 p-1 rounded-sm cursor-pointer border-1 border-gray-400"
            />
          </div>
        </div>
        <div className="lowerSection w-full flex-1 flex justify-start p-4 flex-col items-center gap-3 overflow-y-auto">
          <NavLink
            className="bg-white/10 text-[1em] px-4 py-1 font-[Open_Sans] font-med capitalize w-full flex items-center justify-around gap-3 rounded-sm border-b-1 border-gray-500 text-center"
            to="/infinite"
            onClick={() => setOpen(false)}
          >
            <img
              src={Infinite}
              alt="infinite logo png"
              className="h-3 bg-ambe0 fill-amber-50"
            />
            infinite mode
          </NavLink>
          <NavLink
            className="bg-white/10 px-4 py-1 font-[Open_Sans] font-med capitalize w-full flex items-center justify-around gap-3 rounded-sm text-center"
            to="/"
            onClick={() => setOpen(false)}
          >
            <img
              src={trial}
              alt="infinite logo png"
              className="h-6 bg-ambe0 fill-amber-50"
            />
            trial mode
          </NavLink>
          <ParaLink target="/long-para" content={"long paragraph"} />
        </div>
        <div className="lowerSection w-full h-[15%] flex justify-start p-4 flex-col items-center gap-3">
          <div>
            <p className="text-xs text-gray-300 text-center">
              Made with ❤️ by Deepak{" "}
            </p>
            <p className="text-xs text-gray-300 text-center">
              {" "}
              © 2023 All rights reserved
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://github.com/deepaksingh126"
              target="blank"
              className="p-1 rounded-sm bg-black/30 borer-1 border-gray-400"
            >
              <TwitterLogo />
            </a>
            <a
              href="https://github.com/Deepaksingh126/TypeZ"
              target="blank"
              className="p-1 rounded-sm bg-black/30 boder-1 border-gray-400"
            >
              <GithubLogo />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;