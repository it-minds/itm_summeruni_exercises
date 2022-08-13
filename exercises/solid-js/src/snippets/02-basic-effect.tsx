/** @jsxImportSource solid-js */

import { createEffect, createSignal } from "solid-js";

export const BasicEffect1 = () => {
  const [count, setCount] = createSignal(0);

  const increaseCount = () => setCount((prev) => prev + 1);

  createEffect(() => console.log("count =", count()));

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};

export const BasicEffect2 = () => {
  const [count, setCount] = createSignal(0);

  const increaseCount = () => setCount((prev) => prev + 1);

  createEffect<number>((prev) => {
    const sum = count() + prev;
    console.log("sum =", sum);
    return sum;
  }, 0);

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};

const AsyncCalculations = (a: number, b: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 10);
  });

export const BasicEffect3 = () => {
  const [count, setCount] = createSignal(0);

  const increaseCount = () => setCount((prev) => prev + 1);

  createEffect(async () => {
    const localCount = count();

    const addTwo = await AsyncCalculations(localCount, 2);

    console.log("addtwo =", addTwo);
  });

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};

export const BasicEffect4 = () => {
  const [count, setCount] = createSignal(0);

  const increaseCount = () => setCount((prev) => prev + 1);

  createEffect(async () => {
    const addTwo = await AsyncCalculations(2, 2);

    const localCount = count();
    console.log("async count =", localCount);
  });

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};

export const BasicEffect5 = () => {
  const [count, setCount] = createSignal(0);

  const increaseCount = () => setCount((prev) => prev + 1);

  createEffect<Promise<number>>(async (prevPromise) => {
    const localCount = count();
    const prev = await prevPromise;

    const addTwo = await AsyncCalculations(localCount, prev);

    console.log("async sum =", addTwo);

    return addTwo;
  }, Promise.resolve(0));

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};
