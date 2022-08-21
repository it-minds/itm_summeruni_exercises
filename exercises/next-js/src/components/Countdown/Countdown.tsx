import { FC, useEffect, useRef, useState } from "react";

interface Props {
  initialValue?: number;
}

export const Countdown: FC<Props> = ({ initialValue = 10 }) => {
  const [count, setCount] = useState(initialValue);

  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (count <= 0) throw Error("Boom!");
  }, [count]);

  useEffect(() => {
    timerRef.current = setInterval(() => setCount((c) => c - 1), 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <p> Time left: {count}</p>
      <button onClick={() => setCount(initialValue)}>Reset Countdown</button>
    </div>
  );
};
