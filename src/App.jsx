import React from "react";
import TypingBoard from "./components/TypingBoard";
import Timer from "./components/Timer";
import SideBar from "./components/Sidebar/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import InfiniteTypingBoard from "./components/InfiniteTypingBoard";
import AuthForDev from "./components/DevAuth/AuthForDev";
import './index.css'

const App = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-[Open_Sans]">
      <SideBar />

      <div className="lg:w-[85vw] w-full bg-white dark:bg-black flex items-center justify-center h-screen flex-col absolute right-0 overflow-hidden">
        <Routes>
          <Route
            path="/infinite-typing"
            element={
              <InfiniteTypingBoard
                key={location.pathname}
                />
            }
          />

          <Route
            path="/A-to-Z"
            element={
              <TypingBoard
                key={location.pathname}
                quotes="The quick brown fox jumps over a lazy dog near the wizard's hidden cave. Jack amazed everyone by fixing the bright, complex puzzle in twenty-four seconds. Victor quietly examined the box, judging its quality and size. He zipped his jacket as the breeze whistled through the jungle, full of quirky monkeys and exotic birds. While exploring, he documented each bizarre artifact using his fancy new keyboard and camera. Fred, his assistant, quickly packed the equipment into their van. Despite the frenzy, they kept calm and focused, knowing this expedition would be featured in next month's journal of wild discoveries."
              />
            }
          />

          <Route
            path="/Auth"
            element={<AuthForDev key={location.pathname} />}
          />

          <Route
            path="/"
            element={
              <TypingBoard
                key={location.pathname}
                quotes="The sun is shining today"
              />
            }
          />

          <Route
            path="/long-para"
            element={
              <TypingBoard
                key={location.pathname}
                quotes="the sun is shining today and many people are outside enjoying the warm weather some are walking their dogs while others are sitting on benches and reading books the park is full of life with children playing and families picnicking it's a nice day to be alive"
              />
            }
          />
        </Routes>
      </div>

      {/* some stufffs for styling */}
      <div className="w-[100vw] absolute top-0 right-0 h-screen overflow-hidden overflow-x-hidden">
        {/* <motion.div
          animate={{
            x: ["0vw", "25vw", "50vw", "75vw", "50vw", "25vw", "0vw"],
            y: ["0vh", "10vh", "0vh", "50vh", "80vh", "50vh", "0vh"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-[500px] h-[500px] bg-blue-950/20 rounded-full z-20 absolute top-0 left-0 blur-3xl"
        ></motion.div> */}
      </div>
    </div>
  );
};

export default App;

