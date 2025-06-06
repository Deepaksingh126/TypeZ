import React from 'react'
import { motion } from "motion/react"

function TypingCompleteScreen({ finalTime, WPM, accuracy }) {
    return (
        <div className='w-full h-screen z-40 absolute top-0 right-0 flex justify-center items-center'>
            <div className='flex flex-col items-center justify-between w-[80%] backdrop-blur-xl px-[10vw] py-[10vh] text-gray-800 dark:text-gray-200'>
                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: [1, .4, .3, .8, .7, 1]
                    }}
                    className='backdrop-blur-xl bg-white/90 dark:bg-black/70 p-6 rounded-xl shadow-lg dark:shadow-white/10 text-center font-bold text-5xl'>

                    <p className='pb-10 text-black dark:text-white'>O_o</p>
                    <p className='pb-10 text-black dark:text-white'>stop typing</p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                        <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-black dark:text-white bg-gray-100 dark:bg-white/10">Your time: {finalTime} sec</p>
                        <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-black dark:text-white bg-gray-100 dark:bg-white/10">Your WPM: {WPM}</p>
                        <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-black dark:text-white bg-gray-100 dark:bg-white/10">Your accuracy: {accuracy}%</p>
                    </div>
                </motion.div>
                <button 
                    onClick={() => window.location.reload()} 
                    className='text-xl px-2 py-1 cursor-pointer flex items-center justify-center uppercase  my-4 bg-gray-100 dark:bg-black/40 border border-gray-300 dark:border-gray-600 rounded-sm text-black dark:text-white hover:bg-gray-300 dark:hover:bg-white/10'
                >
                    replay
                </button>
            </div>
        </div>
    )
}

export default TypingCompleteScreen;