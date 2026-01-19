import { useEffect, useRef, useState } from 'react';

type TimerProps = {
  seconds: number;
  onTimeout: () => void;
};

export const GameTimer = ({ seconds, onTimeout }: TimerProps) => {
  const [count, setCount] = useState(seconds);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const interval = setInterval(() => {
      setCount((x) => {
        if (x === 0) {
          clearInterval(interval);
          setTimeout(() => onTimeout(), 0);
          return 0;
        }

        return x - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-6xl font-bold">{count}</span>
    </div>
  );
};
