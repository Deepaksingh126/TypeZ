import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { motion, time } from "motion/react"
import TypingCompleteScreen from './TypingCompleteScreen';

//feature

const InfiniteTypingBoard = (props) => {
    const [words, setWords] = useState([])
    
    // Sample quotes for infinite mode
    const infiniteQuotes = [
        "The sun is shining today, and many people are outside enjoying the warm weather. Some are walking their dogs, while others are sitting on benches reading books.",
        "Technology has revolutionized the way we communicate, work, and learn. From smartphones to artificial intelligence, innovation continues to shape our daily lives.",
        "Reading books opens doors to new worlds and perspectives. Literature has the power to inspire, educate, and transport us to different times and places.",
        "Exercise and proper nutrition are essential for maintaining good health. Regular physical activity strengthens both body and mind while improving overall well-being.",
        "Music is a universal language that transcends cultural boundaries. It has the ability to evoke emotions, create memories, and bring people together across the globe.",
        "Learning new skills throughout life keeps the mind sharp and opens up opportunities. Whether it's coding, cooking, or crafting, continuous growth enriches our experience.",
        "Nature provides countless benefits for mental and physical health. Spending time outdoors can reduce stress, improve mood, and connect us with the natural world.",
        "Friendship is one of life's greatest treasures. Good friends provide support, laughter, and companionship through both joyful and challenging times in our lives."
    ];
    
    // const [quote, setQuote] = useState(props.quotes);
    const [quote, setQuote] = useState(props.quotes);
    const [isInfiniteMode, setIsInfiniteMode] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

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
    
    // Timer settings for infinite mode
    const [timerDuration, setTimerDuration] = useState(30); // Default 30 seconds
    const [timeLeft, setTimeLeft] = useState(30);
    const [showTimerSettings, setShowTimerSettings] = useState(false);
    const [infiniteStartTime, setInfiniteStartTime] = useState(null); // Track start time for infinite mode
    const [timerActive, setTimerActive] = useState(false); // Track if timer is running
    
    // Check if user typed the trigger phrase for infinite mode
    useEffect(() => {
        const cleanTypedChars = typedChars.toLowerCase().replace(/\s+/g, '');
        if (cleanTypedChars.includes("infinitemodeoftyping")) {
            setIsInfiniteMode(true);
            setShowTimerSettings(true); // Show timer settings when entering infinite mode
            // Reset stats for infinite mode
            setCurrentIdx(0);
            setTypedChars("");
            setWordsPressed(0);
            setRightWords(0);
            setTypos(0);
            setTimeLeft(timerDuration);
            // Set first quote for infinite mode
            setQuote(infiniteQuotes[0]);
            setCurrentQuoteIndex(0);
        }
    }, [typedChars, timerDuration]);
    
    // Function to start infinite mode with selected timer
    const startInfiniteMode = (selectedDuration) => {
        setTimerDuration(selectedDuration);
        setTimeLeft(selectedDuration);
        setShowTimerSettings(false);
        // Initialize typing area first
        setCurrentIdx(0);
        setTypedChars("");
        setWordsPressed(0);
        setRightWords(0);
        setTypos(0);
        setIsCompeleted(false); // Ensure completion is false
        setFinalTime(0);
        setWPM(0);
        setAccuracy(0);
        setQuote(infiniteQuotes[0]);
        setCurrentQuoteIndex(0);
        
        // Start timer after a brief delay to ensure all states are reset
        setTimeout(() => {
            setTimerActive(true);
            setInfiniteStartTime(Date.now());
        }, 100);
    };

    
    // Infinite mode timer - stops when time runs out and shows results
    useEffect(() => {
        let timer;
        if (isInfiniteMode && !isCompeleted && !showTimerSettings && timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        // Time's up, stop the test and show results
                        setTimerActive(false);
                        const totalTime = timerDuration; // Use the full timer duration
                        setFinalTime(totalTime);
                        
                        // Calculate final WPM and accuracy for infinite mode
                        // Fixed WPM calculation: (correct chars / 5) / (time in minutes)
                        const timeInMinutes = totalTime / 60;
                        const calculatedWPM = timeInMinutes > 0 ? Math.round((rightWords / 5) / timeInMinutes) : 0;
                        setWPM(calculatedWPM);
                        
                        const calculatedAccuracy = wordsPressed > 0 ? parseFloat(((rightWords / wordsPressed) * 100).toFixed(2)) : 0;
                        setAccuracy(calculatedAccuracy);
                        
                        // Set completion after calculations are done
                        setTimeout(() => {
                            setIsCompeleted(true);
                        }, 100);
                        
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isInfiniteMode, isCompeleted, showTimerSettings, timerActive, timeLeft]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't process keys if timer settings are shown or test is completed
            if (showTimerSettings || isCompeleted) return;
            
            const pressedKey = e.key;

            if (/^[a-zA-Z0-9\s.,!?;:'"()-]$/.test(pressedKey)) {
                setWordsPressed(prev => prev + 1)

                if (pressedKey === quote[currentIdx]) {
                    const nextIdx = currentIdx + 1;
                    if (nextIdx === quote.length) {
                        if (isInfiniteMode && timerActive) {
                            // In infinite mode, immediately load next quote if timer is still active
                            const nextIndex = (currentQuoteIndex + 1) % infiniteQuotes.length;
                            setCurrentQuoteIndex(nextIndex);
                            setQuote(infiniteQuotes[nextIndex]);
                            setCurrentIdx(0);
                        } else if (!isInfiniteMode) {
                            // For regular mode, calculate stats before completion
                            setIsCompeleted(true);
                        }
                    } else {
                        setCurrentIdx(nextIdx);
                    }
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
    }, [currentIdx, quote, words, wordsPressed, isInfiniteMode, currentQuoteIndex, showTimerSettings, timerDuration, timerActive, isCompeleted]);

    
    // Calculate WPM when typing is completed (for regular mode only)
    useEffect(() => {
        if (isCompeleted && finalTime > 0 && !isInfiniteMode) {
            // Fixed WPM calculation for regular mode
            const timeInMinutes = finalTime / 60; // Convert seconds to minutes
            const calculatedWPM = timeInMinutes > 0 ? Math.round((rightWords / 5) / timeInMinutes) : 0;
            setWPM(calculatedWPM);

            const calculatedAccuracy = wordsPressed > 0 ? parseFloat(((rightWords / wordsPressed) * 100).toFixed(2)) : 0;
            setAccuracy(calculatedAccuracy);
        }
    }, [isCompeleted, finalTime, rightWords, isInfiniteMode, wordsPressed]);

    // Function to exit infinite mode
    const exitInfiniteMode = () => {
        setIsInfiniteMode(false);
        setShowTimerSettings(false);
        setTimerActive(false);
        setQuote(props.quotes);
        setCurrentIdx(0);
        setTypedChars("");
        setWordsPressed(0);
        setRightWords(0);
        setTypos(0);
        setTimeLeft(30);
        setTimerDuration(30);
        setIsCompeleted(false);
        setInfiniteStartTime(null);
        setFinalTime(0);
        setWPM(0);
        setAccuracy(0);
    };

    // Function to restart the typing test
    const restartTest = () => {
        if (isInfiniteMode) {
            setShowTimerSettings(true);
            setIsCompeleted(false);
            setTimerActive(false);
            setTimeLeft(timerDuration);
        } else {
            setIsCompeleted(false);
        }
        setCurrentIdx(0);
        setTypedChars("");
        setWordsPressed(0);
        setRightWords(0);
        setTypos(0);
        setFinalTime(0);
        setWPM(0);
        setAccuracy(0);
        setInfiniteStartTime(null);
    };

    return (
        <>
            <div className='min-w-[80%] max-w-[80%] min-h-screen justify-center items-center flex-wrap p-2 rounded-xl flex flex-col gap-10'>

                <div className="topbar w-full flex-wrap overflow-hidden flex justify-end bg-white/10 rounded-xl gap-2 z-40 p-4 shadow-white/10 drop-shadow-2xl shadow-2xl">

                    {/* Show infinite mode indicator with countdown */}
                    {isInfiniteMode && !showTimerSettings && timerActive && (
                        <div className='inline p-2 uppercase font-med bg-green-100/30 rounded-md'>
                            INFINITE MODE - {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                    )}
                    
                    {/* Show current quote number in infinite mode */}
                    {isInfiniteMode && !showTimerSettings && timerActive && (
                        <div className='inline p-2 uppercase font-med bg-blue-100/30 rounded-md'>
                            Quote {currentQuoteIndex + 1} of {infiniteQuotes.length}
                        </div>
                    )}

                    {/* Show "Time's Up!" when infinite mode timer expires */}
                    {isInfiniteMode && isCompeleted && (
                        <div className='inline p-2 uppercase font-med bg-red-100/30 rounded-md'>
                            TIME'S UP!
                        </div>
                    )}

                    {/* Exit infinite mode button */}
                    {isInfiniteMode && (
                        <button 
                            onClick={exitInfiniteMode}
                            className='inline p-2 uppercase font-med bg-red-100/30 rounded-md hover:bg-red-100/50 transition-colors cursor-pointer'
                        >
                            Exit Infinite Mode
                        </button>
                    )}

                    {/* Restart button when test is completed */}
                    {isCompeleted && (
                        <button 
                            onClick={restartTest}
                            className='inline p-2 uppercase font-med bg-blue-100/30 rounded-md hover:bg-blue-100/50 transition-colors cursor-pointer'
                        >
                            Restart Test
                        </button>
                    )}

                    {/* total typos while typing*/}
                    <div className='inline p-2 uppercase font-med bg-white/10 rounded-md border-1 border-gray-500 '>total Typos : {typos}</div>

                    {/* Show cumulative stats in infinite mode */}
                    {isInfiniteMode && !showTimerSettings && (
                        <>
                            <div className='inline p-2 uppercase font-med bg-purple-100/30 rounded-md'>
                                Total Chars: {rightWords}
                            </div>
                            <div className='inline p-2 uppercase font-med bg-yellow-100/30 rounded-md'>
                                Accuracy: {wordsPressed > 0 ? ((rightWords / wordsPressed) * 100).toFixed(1) : 0}%
                            </div>
                        </>
                    )}

                    {/* timer - only show in regular mode */}
                    {!isInfiniteMode && <Timer isCompeleted={isCompeleted} setFinalTime={setFinalTime} />}

                </div>

                {/* Timer Settings Modal for Infinite Mode */}
                {showTimerSettings && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-bold text-white text-center mb-6">
                                Choose Timer Duration
                            </h2>
                            <p className="text-gray-300 text-center mb-8">
                                Select how long you want the typing test to last
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <button
                                    onClick={() => startInfiniteMode(30)}
                                    className="bg-blue-500/30 hover:bg-blue-500/50 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                >
                                    30 Seconds
                                </button>
                                <button
                                    onClick={() => startInfiniteMode(60)}
                                    className="bg-green-500/30 hover:bg-green-500/50 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                >
                                    60 Seconds
                                </button>
                                <button
                                    onClick={() => startInfiniteMode(120)}
                                    className="bg-purple-500/30 hover:bg-purple-500/50 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                >
                                    2 Minutes
                                </button>
                                <button
                                    onClick={() => startInfiniteMode(300)}
                                    className="bg-orange-500/30 hover:bg-orange-500/50 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                >
                                    5 Minutes
                                </button>
                            </div>
                            <button
                                onClick={() => setShowTimerSettings(false)}
                                className="mt-6 text-gray-400 hover:text-white transition-colors w-full text-center"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="w-full flex-wrap overflow-hidden flex justify-end bg-white/10 rounded-xl gap-2 z-40 p-6 shadow-white/20 drop-shadow-2xl shadow-2xl text-white border-1 border-gray-500 ">

                    {/* Show instruction for infinite mode */}
                    {!isInfiniteMode && (
                        <div className="w-full text-center mb-4 p-2 bg-blue-100/20 rounded-md">
                            <span className="text-sm text-gray-300">
                                Type "infinite mode of typing" to enter infinite mode
                            </span>
                        </div>
                    )}

                    {/* Show timer selection message */}
                    {showTimerSettings && (
                        <div className="w-full text-center mb-4 p-4 bg-yellow-100/20 rounded-md">
                            <span className="text-lg text-yellow-200">
                                Please select a timer duration above to continue
                            </span>
                        </div>
                    )}

                    {/* Show completion message when test ends */}
                    {isCompeleted && isInfiniteMode && (
                        <div className="w-full text-center mb-4 p-4 bg-green-100/20 rounded-md">
                            <span className="text-xl text-green-200">
                                Test Complete! Check your results below.
                            </span>
                        </div>
                    )}

                    <div className="w-full h-full p-10 text-center font-mono text-xl flex flex-wrap justify-center items-center">
                        {!showTimerSettings && !isCompeleted && quote.split(' ').map((word, wordIndex) => {
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

            {/* Show completion screen when test is completed (only show if there's actual typing data) */}
            {isCompeleted && (finalTime > 0 || (isInfiniteMode && (rightWords > 0 || wordsPressed > 0))) ? 
                <TypingCompleteScreen finalTime={finalTime} WPM={WPM} accuracy={accuracy} />
                : <div> </div>
            }

            <div className={`${warning ? " " : "bg-gradient-to-br z-30 from-black to-95% to-red-600/20"} w-[100vw] h-screen absolute top-0 right-0`}></div>
        </>

    );
};

export default InfiniteTypingBoard;