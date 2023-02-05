import React, { useState, useEffect } from "react";

const TypeWriter = () => {
  const text = "Weather App";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typing;
    typing = setInterval(() => {
      setIndex((index) => {
        const nextIndex = index + 1;
        if (nextIndex === text.length) {
          clearInterval(typing);
        }
        return nextIndex;
      });
      setDisplayText(text.slice(0, index + 1));
    }, 40);

    return () => {
      clearInterval(typing);
    };
  }, [index]);

  return (
    <h1 className="weather-app-title">
      <span id="typewriter">{displayText}</span>
    </h1>
  );
};

export default TypeWriter;
