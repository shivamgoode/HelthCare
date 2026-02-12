import React, { useState } from "react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // 🔥 Function to open Chikitsak AI
  const openChikitsakAI = () => {
    window.dispatchEvent(new Event("open-chikitsak-ai"));
  };

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
          *{
              font-family: "Poppins", sans-serif;
          }
          @keyframes rotate {
              100% {
                  transform: rotate(1turn);
              }
          }

          .rainbow::before {
              content: '';
              position: absolute;
              z-index: -2;
              left: -50%;
              top: -50%;
              width: 200%;
              height: 200%;
              background-position: 100% 50%;
              background-repeat: no-repeat;
              background-size: 50% 30%;
              filter: blur(6px);
              background-image: linear-gradient(#FFF);
              animation: rotate 4s linear infinite;
          }
        `}
      </style>

      <header className="bg-black text-white flex flex-col items-center pb-10 max-w-full">
        <nav className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <div
              id="menu"
              className={`${mobileOpen ? "max-md:w-full" : "max-md:w-0"} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}
            >
              <div className="p-[0.5px] rounded-full bg-linear-to-r from-white to-[#999999]/0"></div>
            </div>
          </div>
        </nav>

        <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-28 md:mt-32">
          <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
            <div className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75 animate-ping duration-300"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[#A6FF5D]"></span>
            </div>
            <span className="text-xs">Because your life matters.</span>
          </button>
        </div>

        <h1 className="text-4xl md:text-[64px]/[82px] text-center max-w-4xl mt-5 bg-clip-text leading-tight px-4">
          Where Care Meets Contribution.
        </h1>

        <p className="text-sm md:text-base text-gray-300 bg-clip-text text-center max-w-lg mt-4.5 px-4">
          It frames the website as a meeting place for those in need and those
          with skills to share.
        </p>

        {/* 🔥 UPDATED BUTTON */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={openChikitsakAI}
            className="bg-[green] hover:bg-[#A6FF5D]/90 text-black-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group"
          >
            <div className="relative overflow-hidden">
              <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                🤖 Chikitsak
              </span>
              <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full text-center">
                🧠 Lets talk
              </span>
            </div>
          </button>
        </div>

        <div className="scroll-down flex flex-col items-center gap-4 mt-20 animate-bounce cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 9A7 7 0 1 0 5 9v6a7 7 0 1 0 14 0zm-7-3v4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm text-white/50">Scroll down</p>
        </div>
      </header>
    </>
  );
};
