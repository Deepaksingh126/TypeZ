import React from 'react'
import { motion } from "motion/react"
import reload from "../assets/reload.svg"
import { useLocation, useNavigate } from 'react-router-dom'

function TypingCompleteScreen({ finalTime, WPM, accuracy, onRestart }) {

    const location = useLocation()
    const handleGameRestart = () => {
        if (onRestart && typeof onRestart === 'function') {
            onRestart(); // Call the restart function passed from parent
        } else {
            // Fallback to page reload if no restart function there
            window.location.reload();
        }
    };

    return (
        <div className='w-full h-screen z-40 absolute top-0 right-0 text-center font-bold text-5xl flex justify-center items-center'>
            <div className=' flex items-center justify-center w-[80%] backdrop-blur-xl px-[10vw] py-[10vh] text-gray-200'>
                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: [1, .4, .3, .8, .7, 1]
                    }}
                    className='backdrop-blur-xl bg-black/10 p-6 rounded-xl shadow-white/10 drop-shadow-2xl shadow-2xl'>

                    <p className='pb-10 '>O_o</p>
                    <p className='pb-10'>stop typing</p>

                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your time: {finalTime} sec</p>
                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your WPM: {WPM}</p>
                    <p className="text-lg inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10">Your accuracy: {accuracy}%</p>
                    
                    {/* handling the restart button */}
                    <button 
                        onClick={handleGameRestart}
                        className='reload inline mx-2 py-1 rounded-sm px-2 text-white bg-white/10 text-lg hover:bg-white/20 transition-colors'
                    >
                        <img src={reload} alt="reload" className="h-5" />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default TypingCompleteScreen;