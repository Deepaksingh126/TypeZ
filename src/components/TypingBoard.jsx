import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { motion, time } from "motion/react"
import TypingCompleteScreen from './TypingCompleteScreen';

const TypingBoard = (props) => {
    const [words, setWords] = useState([])
    const [quote, setQuote] = useState(props.quotes)

    const [currentIdx, setCurrentIdx] = useState(0);
    const [typedChars, setTypedChars] = useState("");
    const [wordsPressed, setWordsPressed] = useState(0)
    const [rightWords, setRightWords] = useState(0)
    const [warning, setWarning] = useState(true);
    const [typos, setTypos] = useState(0);
    const [isCompeleted, setIsCompeleted] = useState(false)
    const [finalTime, setFinalTime] = useState(0);
    const [WPM, setWPM] = useState(0)
    const [accuracy, setAccuracy] = useState(0)

    useEffect(() => {

        const handleKeyDown = (e) => {
            const pressedKey = e.key;

            if (/^[a-zA-Z0-9\s'",".]$/.test(pressedKey)) {
                setWordsPressed(prev => prev + 1)

                if (pressedKey === quote[currentIdx]) {
                    const nextIdx = currentIdx + 1;
                    if (nextIdx === quote.length) {
                        setIsCompeleted(true);
                    }
                    setCurrentIdx(nextIdx);
                    setTypedChars(prev => prev + pressedKey);
                    setRightWords(prev => prev + 1)
                    setWarning(prev => prev = true)

                } else {
                    setWarning(prev => prev = false)
                    setTypos(prev => prev + 1)
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIdx, quote, words, wordsPressed]);


    // Calculate WPM when typing is completed
    useEffect(() => {
        if (isCompeleted && finalTime > 0) {

            const timeInMinutes = finalTime / 8;//number 8 is assuring that this salculation will show word per minute and not aplbet ot keysTyped per minute. i am assumned that there is 6-7 words are commmon in words.
            const calculatedWPM = Math.round(rightWords / timeInMinutes);
            setWPM(calculatedWPM);

            const calculatedAccuracy = ((rightWords / wordsPressed) * 100).toFixed(2);
            setAccuracy(calculatedAccuracy);
        }
    }, [isCompeleted, finalTime, rightWords]);


    return (
        <>
            <div className='min-w-[80%] max-w-[80%] min-h-screen justify-center items-center flex-wrap p-2 rounded-xl flex flex-col gap-10'>

                <div className="topbar w-full flex-wrap overflow-hidden flex justify-end bg-white/10 rounded-xl gap-2 z-40 p-4 shadow-white/10 drop-shadow-2xl shadow-2xl">

                    {/* total typos while typing*/}
                    <div className='inline p-2 uppercase font-med bg-white/10 rounded-md border-1 border-gray-500 '>total Typos : {typos}</div>

                    {/* timer */}
                    <Timer isCompeleted={isCompeleted} setFinalTime={setFinalTime} />


                </div>

                <div className="w-full flex-wrap overflow-hidden flex justify-end bg-white/10 rounded-xl gap-2 z-40 p-6 shadow-white/20 drop-shadow-2xl shadow-2xl text-white border-1 border-gray-500 ">



                    <div className="w-full h-full p-10 text-center font-mono text-xl flex flex-wrap justify-center items-center">
                        {quote.split(' ').map((word, wordIndex) => {
                            const startIndex = quote.split(' ').slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0); // +1 for space
                            return (
                                <span key={wordIndex} className="flex">
                                    {word.split('').map((char, charIndex) => {
                                        const index = startIndex + charIndex;
                                        return (
                                            <span
                                                key={index}
                                                className={` ${index < currentIdx
                                                    ? 'text-white/40'
                                                    : index === currentIdx
                                                        ? 'bg-white text-black'
                                                        : 'text-white'} w-3 text-lg`} > {char}
                                            </span>
                                        );
                                    })}
                                    {/* Add space after each word */}
                                    <span
                                        className={`${startIndex + word.length < currentIdx
                                            ? 'text-gray-800'
                                            : startIndex + word.length === currentIdx
                                                ? 'bg-white text-black'
                                                : 'text-gray-700'
                                            } w-3 text-lg`}
                                    >
                                        {' '}
                                    </span>

                                </span>
                            );
                        })}
                    </div>



                </div>

            </div>

            {/* <Typing Complete Screen/> */}
            {isCompeleted ? <TypingCompleteScreen finalTime={finalTime} WPM={WPM} accuracy={accuracy} />
                : <div> </div>}

            <div
                animate={{
                    opacity: 0
                }}
                transition={{
                    duration: 2
                }}
                className={`${warning ? " " : "bg-gradient-to-br z-30 from-black to-95% to-red-600/20"} w-[100vw] h-screen absolute top-0 right-0`}></div>
        </>

    );
};

export default TypingBoard;
