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
        <div className='inline p-2 uppercase font-med bg-white dark:bg-black/10 rounded-md border border-gray-300 dark:border-gray-600 text-black dark:text-white'>
            time : {time}
        </div>
    )
}

export default Timer