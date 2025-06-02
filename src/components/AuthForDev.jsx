import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import LeftArrowLogo from "../Svg/LeftArrowLogo";

function AuthForDev() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "deepika.dev") {
      navigate("/infinite-typing");
    } else if (password.trim() === "") {
      setError("please enter the password");
    } else {
      setError("Invalid password");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 z-40">
      {error ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="rounded bg-red-300/30 text-bold p-4 border-1 border-red-400/60 w-full text-center "
        >
          {error}
        </motion.div>
      ) : (
        <></>
      )}

      <h2 className="text-2xl font-bold mb-2 text-center sm:text-xl p-0 m-0">Developer Authentication Page</h2>

      <p className="text-lg text-white/80 lg:text-base mb-4 text-center sm:text-[0.8rem] p-4 text-[0.6rem] ">
        This page is for developers. If you want to contribute or test the
        infinite typing mode, click the button below.
      </p>

      <input
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={handleKeyDown}
        className="sm:w-full w-2/3  max-w-md p-2 rounded-md bg-white/10 border-1 border-gray-500"
        />
      <div className="flex w-1/2 items-center justify-around mt-6 flex-wrap gap-2">
        <Link
          to="/infinite-typing"
          className="px-6 py-2 bg-blue-700 hover:bg-blue-800  lg:text-base mb-4 text-center sm:text-[0.8rem] rounded text-white text-[1rem] font-semibold transition cursor-pointer"
          onClick={handleSubmit}
        >
          Go to Infinite Typing Test
        </Link>

        <a href="https://x.com/Deepak12_6" target="blank" className="flex  lg:text-base mb-4 text-center sm:text-[0.8rem] gap-2 items-center justify-around border-1 round border-white/40 px-4 py-2 font-bold">
          contact the dev
          <LeftArrowLogo/>
        </a>
      </div>
    </div>
  );
}

export default AuthForDev;
