import React from 'react'
import TypingBoard from './components/TypingBoard'
import Timer from './components/Timer'
import SideBar from './components/SideBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { motion } from "motion/react"
import InfiniteTypingBoard from './components/InfiniteTypingBoard'

const App = () => {
  const location = useLocation();
  return (
    <div className=' text-white font-[Open_Sans] bg-black'>

      <SideBar />

      <div className='lg:w-[85vw] w-full bg-black flex items-center justify-center h-screen flex-col absolute right-0 overflow-hidden'>
        <Routes>
          <Route
            path='/infinite'
            element={<InfiniteTypingBoard
              key={location.pathname}
              quotes="infinite mode of typing"
            />}
          />

          <Route
            path='/'
            element={<TypingBoard
              key={location.pathname}
              quotes="The sun is shining today"
            />}
          />

          <Route
            path='/long-para'
            element={<TypingBoard
              key={location.pathname}
              quotes="The sun is shining today, and many people are outside enjoying the warm weather. Some are walking their dogs, while others are sitting on benches and reading books. The park is full of life, with children playing and families picnicking. It's a nice day to be alive."
            />}
          />

        </Routes>
      </div>

      {/* some stufffs for styling */}
      <div className='w-[100vw] absolute top-0 right-0 h-screen overflow-hidden overflow-x-hidden'>

        <motion.div
          animate={{
            x: ['0vw', '15vw', '40vw', '70vw', '40vw', '35vw', '10vw'],
            y: ['0vh', '10vh', '0vh', '50vh', '80vh', '40vh', '0vh']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear'
          }}
          className='w-[500px] h-[500px] bg-blue-950/20 rounded-full z-20 absolute top-0 left-0 blur-3xl'></motion.div>

        <motion.div
          animate={{
            x: ['0vw', '25vw', '50vw', '75vw', '50vw', '25vw', '0vw'],
            y: ['0vh', '10vh', '0vh', '50vh', '80vh', '50vh', '0vh']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear'
          }}
          className='w-[500px] h-[500px] bg-blue-950/20 rounded-full z-20 absolute top-0 left-0 blur-3xl'></motion.div>
      </div>


    </div>
  )
}

export default App