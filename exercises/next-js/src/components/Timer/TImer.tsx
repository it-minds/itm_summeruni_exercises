import { FC, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  initialValue?: number;
}

export const Timer: FC<Props> = ({ initialValue = Date.now() }) => {
  const startTime = useMemo(() => new Date(initialValue), [initialValue])
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const elapsedTime = useMemo(() => Math.round((currentTime.getTime() - startTime.getTime()) / 1000), [startTime, currentTime])

  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrentTime(() => new Date(Date.now())), 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);



  return (
    <div>
      <p>Start time: {startTime.toLocaleTimeString()}</p>
      <p>Current time: {currentTime.toLocaleTimeString()}</p>
      <p>Elapsed time: {elapsedTime}</p>
    </div>
  );
};
