import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { motion, time } from "motion/react";
import TypingCompleteScreen from "./TypingCompleteScreen";
import ReloadLogo from "../Svg/ReloadLogo";

const TypingBoard = (props) => {
  const [words, setWords] = useState([]);
  const [quote, setQuote] = useState(props.quotes);

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


  let currentCharIndex = 0;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key;

      if (/^[a-zA-Z0-9\s'",".]$/.test(pressedKey)) {
        setWordsPressed((prev) => prev + 1);

        if (pressedKey === quote[currentIdx]) {
          const nextIdx = currentIdx + 1;
          if (nextIdx === quote.length) {
            setIsCompeleted(true);
          }
          setCurrentIdx(nextIdx);
          setTypedChars((prev) => prev + pressedKey);
          setRightWords((prev) => prev + 1);
          setWarning((prev) => (prev = true));
        } else {
          setWarning((prev) => (prev = false));
          setTypos((prev) => prev + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, quote, words, wordsPressed]);

  // Calculate WPM when typing is completed
  useEffect(() => {
    if (isCompeleted && finalTime > 0) {
      const timeInMinutes = finalTime / 12; //number 8 is assuring that this salculation will show word per minute and not aplbet ot keysTyped per minute. i am assumned that there is 6-7 words are commmon in words.
      const calculatedWPM = Math.round(rightWords / timeInMinutes);
      setWPM(calculatedWPM);

      const calculatedAccuracy = ((rightWords / wordsPressed) * 100).toFixed(2);
      setAccuracy(calculatedAccuracy);
    }
  }, [isCompeleted, finalTime, rightWords]);

  return (
    <>
      <div className="min-w-[80%] max-w-[80%] min-h-screen justify-center items-center flex-wrap p-2 rounded-xl flex flex-col gap-10">
        <div className="topbar w-full flex-wrap-reverse sm:flex-wrap overflow-hidden flex justify-center sm:justify-end bg-gray-100 dark:bg-white/10 rounded-xl gap-3 z-40 p-4 shadow-lg dark:shadow-white/10">
          {/* button if user wants to restart again */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 p-2 uppercase font-med bg-white dark:bg-black/10 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 rounded-md border border-gray-300 dark:border-gray-600 w-full sm:w-fit text-black dark:text-white"
          >
            <ReloadLogo /> replay
          </button>

          {/* total typos while typing*/}
          <div className="inline p-2 uppercase font-med bg-white dark:bg-black/10 rounded-md border border-gray-300 dark:border-gray-600 text-black dark:text-white">
            total Typos : {typos}
          </div>

          {/* timer */}
          <Timer isCompeleted={isCompeleted} setFinalTime={setFinalTime} />
        </div>

        <div className="w-full flex-wrap overflow-hidden flex justify-end bg-gray-100 dark:bg-white/10 rounded-xl gap-2 z-40 p-6 shadow-lg dark:shadow-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600">
          <span className="w-full h-full p-10 text-center font-mono text-xl flex flex-wrap justify-center items-center gap-0 leading-none"  aria-hidden="true">
            
            {quote.split(" ").map((word, wordIndex) => {
              const startIndex = currentCharIndex;
              currentCharIndex += word.length + 1;

              return (
                <span key={wordIndex} className="inline-flex">
                  {word.split("").map((char, charIndex) => {
                    const index = startIndex + charIndex;
                    return (
                      <span
                        key={index}
                        className={` ${
                          index < currentIdx
                            ? "text-gray-400 dark:text-white/40"
                            : index === currentIdx
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "text-black dark:text-white"
                        } text-lg inline-block whitespace-nowrap`}
                        aria-hidden="true"
                      >
                        {" "}
                        {char}
                      </span>
                    );
                  })}
                  <span
                    className={`${
                      startIndex + word.length < currentIdx
                        ? "text-gray-400 dark:text-white/40"
                        : startIndex + word.length === currentIdx
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "text-gray-600 dark:text-gray-400"
                    } w-3 text-lg`}
                    aria-hidden="true"
                  >
                    {" "}
                  </span>
                </span>
              );
            })}
          </span>
        </div>
      </div>

      {/* <Typing Complete Screen/> */}
      {isCompeleted && (
        <TypingCompleteScreen
          finalTime={finalTime}
          WPM={WPM}
          accuracy={accuracy}
        />
      )}
       <div
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className={`${
          warning ? "" : "bg-gradient-to-br opacity-40 from-black to-red-600/60"
        } w-[100vw] h-screen absolute top-0 right-0 z-30`}
      ></div>
    </>
  );
};

export default TypingBoard;
