import { useEffect, useState } from "react";

export default function useTimer(isActive, onTimeout, interval = 1000) {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (!isActive) return;
    if (timer === 0) {
      onTimeout();
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, interval);

    return () => clearInterval(countdown);
  }, [isActive, timer, onTimeout, interval]); // <- adicionado aqui

  const reset = () => setTimer(10);

  return [timer, reset];
}
