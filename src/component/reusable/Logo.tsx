import React from "react";

const Logo = () => {
  return (
    <div>
      <h1 className="m-3 inline-block text-4xl font-bold transition-transform duration-300">
        {[..."Eventify"].map((letter, index) => (
          <span
            key={index}
            className="inline-block text-black transition-transform duration-300 [text-shadow:1px_1px_0px_rgba(0,0,0,0.9),2px_2px_2px_rgba(0,0,0,0.8),3px_3px_5px_rgba(0,0,0,0.6),4px_4px_8px_rgba(0,0,0,0.4),5px_5px_10px_rgba(0,0,0,0.2)] hover:scale-110 dark:text-white dark:[text-shadow:1px_1px_0px_rgba(255,255,255,0.9),2px_2px_2px_rgba(255,255,255,0.8),3px_3px_5px_rgba(255,255,255,0.6),4px_4px_8px_rgba(255,255,255,0.4),5px_5px_10px_rgba(255,255,255,0.2)]"
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Logo;
