import { useEffect, useState } from "react";
import Timer from "./Timer";
import TypingCompleteScreen from "./TypingCompleteScreen";
import ReloadLogo from "../Svg/ReloadLogo";

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

  const lineHeight = 14; // Approximate line height in pixels
  const charsPerLine = 20; // Approximate characters per line
  let currentCharIndex = 0;

  // Array of random words to use
  const randomWords = [
    "quick",
    "brown",
    "jumps",
    "over",
    "lazy",
    "dog",
    "hello",
    "world",
    "react",
    "next",
    "fast",
    "code",
    "build",
    "smart",
    "think",
    "learn",
    "focus",
    "grit",
    "zebra",
    "vibes",
    "explore",
    "jump",
    "quiz",
    "yes",
    "no",
    "okay",
    "keyboard",
    "mouse",
    "screen",
    "energy",
    "value",
    "power",
    "trust",
    "drive",
    "clear",
    "speed",
    "logic",
    "funny",
    "happy",
    "notes",
    "quiet",
    "voice",
    "amaze",
    "trend",
    "watch",
    "sound",
    "bright",
    "pixel",
    "frame",
    "click",
    "zone",
  ];


  // Function to generate a random word
  const getRandomWord = () => {
    return randomWords[Math.floor(Math.random() * randomWords.length)];
  };

  // Function to add new words to the quote
  const addNewWords = () => {
    const newWords = Array.from({ length: 100 }, () => getRandomWord()).join(
      " "
    );
    setQuote((prev) => (prev ? `${prev} ${newWords}` : newWords));
  };

  // Initialize with some words
  useEffect(() => {
    addNewWords();
  }, []);

  // Add new words when user reaches near the end
  useEffect(() => {
    const wordsArray = quote.split(" ");
    if (currentIdx > wordsArray.join(" ").length - 50) {
      addNewWords();
    }
  }, [currentIdx, quote]);

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
  }, [currentIdx, quote]);

  // Add auto-scroll effect
  useEffect(() => {
    const typingArea = document.querySelector(".typing-area");
    if (typingArea) {
      const currentLine = Math.floor(currentIdx / charsPerLine);

      // Only scroll when we complete a line
      if (currentIdx % charsPerLine === 0) {
        const scrollPosition = Math.max(0, currentLine * lineHeight);
        typingArea.scrollTop = scrollPosition;
      }
    }
  }, [currentIdx]);

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
            <span
              className="typing-area w-full transition-transform duration-100 gap-0 leading-none " aria-hidden="true"
              style={{
                transform: `translateY(-${Math.floor(currentIdx / charsPerLine) * lineHeight
                  }px)`,
              }}
            >

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
                          className={` ${index < currentIdx
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
                      className={`${startIndex + word.length < currentIdx
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
        className={`${warning ? "" : "bg-gradient-to-br opacity-40 from-white to-red-600 dark:from-black dark:to-red-600"
          } w-[100vw] h-screen absolute top-0 right-0 z-30`}
      ></div>
    </>
  );
};

export default InfiniteTypingBoard;
