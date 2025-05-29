import React from 'react'
import { motion } from "motion/react"

function TypingCompleteScreen({ finalTime, WPM, accuracy }) {
    return (
        <div className='w-full h-screen z-40 absolute top-0 right-0 flex justify-center items-center'>

            <div className=' flex flex-col items-center justify-between w-[80%] backdrop-blur-xl px-[10vw] py-[10vh] text-gray-200'>

                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: [1, .4, .3, .8, .7, 1]
                    }}
                    className='backdrop-blur-xl bg-black/10 p-6 rounded-xl shadow-white/10 drop-shadow-2xl shadow-2xl text-center font-bold text-5xl '>

                    <p className='pb-10 '>O_o</p>
                    <p className='pb-10'>stop typing</p>

                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your time: {finalTime} sec</p>
                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your WPM: {WPM}</p>
                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your accuracy: {accuracy}
                        %
                    </p>
                </motion.div>
                <button onClick={() => window.location.reload()} className='text-xl px-2 py-1 cursor-pointer flex items-center justify-center uppercase font-medium my-4 bg-black/40 border-1 border-gray-400 rounded-xl'>replay</button>
            </div>



        </div>

    )
}

export default TypingCompleteScreen