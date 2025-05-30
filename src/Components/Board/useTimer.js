import { useEffect, useState } from "react";

export default function useTimer(isActive, onTimeout, interval = 1000) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    if (timer === 10) {
      onTimeout();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, interval);

    return () => clearInterval(countdown);
  }, [isActive, timer, onTimeout, interval]);

  const reset = () => setTimer(0);

  return [timer, reset];
}
