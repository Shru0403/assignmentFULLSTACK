import { useState, useEffect, useRef } from "react";

function useTimer(defaultMinutes = 25) {
  const [duration, setDuration] = useState(defaultMinutes);
  const [timeLeft, setTimeLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function startTimer() {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer(newDuration = duration) {
    setIsRunning(false);

    setDuration(newDuration);
    setTimeLeft(newDuration * 60);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes,
    seconds,
    isRunning,
    duration,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}

export default useTimer;