import { useState } from "react";
import ParaLink from "./ParaLink";
import GithubLogo from "../../Svg/GithubLogo";
import TwitterLogo from "../../Svg/TwitterLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import ToggleButton from "./ToggleBtn";
import InfiniteLoop from "../../Svg/InfiniteLoop";
import TrialMode from "../../Svg/TrialMode";

function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[99] sm:z-40 bg-white/95 dark:bg-black/95 p-2 rounded focus:outline-none text-2xl md:text-3xl text-black dark:text-white"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>

      <div
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col items-center bg-gray-50/70 dark:bg-black capitalize transition-transform duration-300 ease-in-out
          w-[70vw] sm:w-[40vw] lg:w-[15vw] min-w-[200px] max-w-[320px]
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="upperSection w-full h-[10%] p-4 flex items-center flex-col justify-between mt-8 sm:mt-0">
          <div className="w-full p-2 flex justify-between align-center">
            <p className="text-[1.3rem] font-med font-mono text-black dark:text-white">TypeZ</p>
            <ToggleButton />
          </div>
        </div>
        <div className="lowerSection w-full flex-1 flex justify-start p-4 flex-col items-center gap-3 overflow-y-auto">


          {/* infinite mode tab  */}

          <ParaLink
            target="/Auth"
            content={"Infinite Mode"}
            icon={<InfiniteLoop />}
            className={"border-b-1 border-gray-500 "}
            // func={"onClick={() => setOpen(false)}"}
          />


          <ParaLink
            target="/"
            content={"trial mode"}
            icon={<TrialMode />}
            // func={"onClick={() => setOpen(false)}"}
          />

          <ParaLink target="/long-para" content={"long paragraph"} />
          <ParaLink target="/A-to-Z" content={"A to Z"} />

        </div>

        {/* side baar footer  */}
        <div className="lowerSection w-full h-[15%] flex justify-start p-4 flex-col items-center gap-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
              Made with ❤️ by Deepak{" "}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
              {" "}
              © 2023 All rights reserved
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://x.com/Deepak12_6"
              target="blank"
              className="p-1 rounded-sm bg-gray-100 dark:bg-black/30 border-1 border-gray-400"
            >
              <TwitterLogo />
            </a>
            <a
              href="https://github.com/Deepaksingh126/TypeZ"
              target="blank"
              className="p-1 rounded-sm bg-gray-100 dark:bg-black/30 border-1 border-gray-400"
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