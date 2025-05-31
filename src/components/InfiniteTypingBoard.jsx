import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { motion } from "motion/react"
import TypingCompleteScreen from './TypingCompleteScreen';
import ReloadLogo from '../Svg/ReloadLogo';



//feature

const InfiniteTypingBoard = (props) => {
    const [words, setWords] = useState([]);
    const [quote, setQuote] = useState("");
    const [currentIdx, setCurrentIdx] = useState(0);
    const [typedChars, setTypedChars] = useState("");
    const [wordsPressed, setWordsPressed] = useState(0);
    const [rightWords, setRightWords] = useState(0);
    const [warning, setWarning] = useState(true);
    const [typos, setTypos] = useState(0);
    const [isCompeleted, setIsCompeleted] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    // Array of random words to use
    const randomWords = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
        "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what"
    ];

    // Function to generate a random word
    const getRandomWord = () => {
        return randomWords[Math.floor(Math.random() * randomWords.length)];
    };

    // Function to add new words to the quote
    const addNewWords = () => {
        const newWords = Array.from({ length: 100 }, () => getRandomWord()).join(' ');
        setQuote(prev => prev ? `${prev} ${newWords}` : newWords);
    };

    // Initialize with some words
    useEffect(() => {
        addNewWords();
    }, []);

    // Add new words when user reaches near the end
    useEffect(() => {
        const wordsArray = quote.split(' ');
        if (currentIdx > wordsArray.join(' ').length - 50) {
            addNewWords();
        }
    }, [currentIdx, quote]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const pressedKey = e.key;

            if (/^[a-zA-Z0-9\s'",".]$/.test(pressedKey)) {
                setWordsPressed(prev => prev + 1);

                if (pressedKey === quote[currentIdx]) {
                    const nextIdx = currentIdx + 1;

                    if (nextIdx === quote.length) {
                        setIsCompeleted(true);
                    }

                    setCurrentIdx(nextIdx);
                    setTypedChars(prev => prev + pressedKey);
                    setRightWords(prev => prev + 1);
                    setWarning(prev => prev = true);
                } else {
                    setWarning(prev => prev = false);
                    setTypos(prev => prev + 1);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIdx, quote]);

    // Add auto-scroll effect
    useEffect(() => {
        const typingArea = document.querySelector('.overflow-y-auto');
        if (typingArea) {
            const lineHeight = 24; // Approximate line height in pixels
            const currentLine = Math.floor(currentIdx / 40); // Approximate characters per line
            const scrollPosition = Math.max(0, (currentLine - 2) * lineHeight);
            typingArea.scrollTop = scrollPosition;
        }
    }, [currentIdx]);

    // Calculate WPM when typing is completed
    useEffect(() => {
        if (isCompeleted && finalTime > 0) {
            const timeInMinutes = finalTime / 8;
            const calculatedWPM = Math.round(rightWords / timeInMinutes);
            setWPM(calculatedWPM);

            const calculatedAccuracy = ((rightWords / wordsPressed) * 100).toFixed(2);
            setAccuracy(calculatedAccuracy);
        }
    }, [isCompeleted, finalTime, rightWords]);

    return (
        <>
            <div className='min-w-[80%] max-w-[80%] min-h-screen justify-center items-center flex-wrap p-2 rounded-xl flex flex-col gap-10'>

                <div className="topbar w-full flex-wrap-reverse sm:flex-wrap overflow-hidden flex justify-center sm:justify-end bg-white/10 rounded-xl gap-3 z-40 p-4 shadow-white/10 drop-shadow-2xl shadow-2xl">
                    {/* button if user wants to restart again */}
                    <button onClick={() => window.location.reload()}
                        className='flex items-center justify-center gap-2 p-2 uppercase font-med bg-black/10 cursor-pointer hover:bg-white/10 rounded-md border-1 border-gray-500 w-full sm:w-fit'>
                        <ReloadLogo /> replay</button>
                    {/* total typos while typing*/}
                    <div className='inline p-2 uppercase font-med bg-white/10 rounded-md border-1 border-gray-500 '>total Typos : {typos}</div>

                    {/* timer */}
                    <Timer isCompeleted={isCompeleted} setFinalTime={setFinalTime} />


                </div>

                <div className="w-full flex-wrap overflow-hidden flex justify-end bg-white/10 rounded-xl gap-2 z-40 p-6 shadow-white/20 drop-shadow-2xl shadow-2xl text-white border-1 border-gray-500 ">
                    {/* 
                        AUTO-SCROLLING MECHANISM:
                        The scrolling is achieved through CSS transform on the inner div.
                        - The transform: translateY(-${currentIdx * 1.5}px) moves the text up as user types
                        - currentIdx * 1.5 determines scroll speed (adjust multiplier to change speed)
                        - transition-transform adds smooth animation
                        - overflow-hidden on parent prevents scrollbars
                        
                        To modify scrolling behavior:
                        1. Adjust the multiplier (1.5) in the transform style
                        2. Change duration-100 in transition-transform for faster/slower animation
                        3. Modify the h-[200px] to change visible area height
                    */}
                    <div className="w-full h-[300px] overflow-hidden its-end p-10 text-center font-mono text-xl flex flex-wrap justify-center items-center">
                        <div className="w-full transition-transform duration-100" style={{ transform: `translateY(-${Math.max(0, currentIdx * 1.5)}px)` }}>
                            {quote.split(' ').map((word, wordIndex) => {
                                const startIndex = quote.split(' ').slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
                                return (
                                    <span key={wordIndex} className="inline-flex">
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

export default InfiniteTypingBoard;

