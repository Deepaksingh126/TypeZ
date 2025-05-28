import React, { useEffect, useState } from 'react'

function Timer({ isCompeleted, setFinalTime }) {
    const [timer, setTimer] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (/^[a-zA-Z0-9\s]$/.test(e.key)) {   
                setTimer(true)
            }
        });
        let intervalId;
        if (timer) {
            if (!isCompeleted) {
                intervalId = setInterval(() => {
                    setTime((prevTime) => prevTime + 1);
                }, 1000);
            } else {
                clearInterval(intervalId);
                setFinalTime(time);
            }
        }

        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, [timer, isCompeleted, setFinalTime]);

    return (

        <div className='inline p-2 uppercase font-med bg-white/10 rounded-md border-1 border-gray-500 '>time : {time}</div>

    )
}

export default Timer