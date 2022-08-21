/** @jsxImportSource solid-js */

import {
  createEffect,
  createSignal,
  ErrorBoundary,
  observable,
  on,
  onCleanup,
  onError,
  onMount,
  untrack,
  from,
  Component,
} from "solid-js";

export const AdvancedEffect1: Component = () => {
  const [countdown, setCountdown] = createSignal(10);

  const decreaseCountdown = () => setCountdown((prev) => prev - 1);
  const interval = setInterval(decreaseCountdown, 1000);

  createEffect(() => {
    if (countdown() <= 0) {
      throw Error("BOOM!");
    }
  });

  onMount(() => console.log("Tick Tock - the bomb till go off in 10 seconds!"));
  onCleanup(() => clearInterval(interval));
  onError((err) => {
    console.error("Looks like the bomb went off!", err.message);
    throw err;
  });

  return (
    <div>
      <p>Countdown {countdown()}</p>
      <button type="button" onClick={() => setCountdown(10)}>
        reset
      </button>
    </div>
  );
};

export const AdvancedEffect2 = () => {
  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <button onClick={reset}>Try again! {JSON.stringify(err)}</button>
      )}
    >
      <AdvancedEffect1 />
    </ErrorBoundary>
  );
};

export const AdvancedEffect3 = () => {
  const [counter1, setCounter1] = createSignal(0);
  const [counter2, setCounter2] = createSignal(0);

  createEffect(() => {
    console.log(counter2() + untrack(counter1));
  });

  return (
    <div>
      <button onClick={() => setCounter1((prev) => prev + 1)}>
        Increase Counter 1
      </button>
      <button onClick={() => setCounter2((prev) => prev + 1)}>
        Increase Counter 2
      </button>
      <p>Counter 1 value is {counter1()}</p>
      <p>Counter 2 value is {counter2()}</p>
    </div>
  );
};

export const AdvancedEffect4 = () => {
  const [counter1, setCounter1] = createSignal(0);
  const [counter2, setCounter2] = createSignal(0);

  createEffect(
    on(counter1, (count1) => {
      console.log(counter2() + count1);
    })
  );

  return (
    <div>
      <button onClick={() => setCounter1((prev) => prev + 1)}>
        Increase Counter 1
      </button>
      <button onClick={() => setCounter2((prev) => prev + 1)}>
        Increase Counter 2
      </button>
      <p>Counter 1 value is {counter1()}</p>
      <p>Counter 2 value is {counter2()}</p>
    </div>
  );
};

export const AdvancedEffect5 = () => {
  const [counter1, setCounter1] = createSignal(0);
  const [counter2, setCounter2] = createSignal(0);

  createEffect(
    on(counter1, (count1) => {
      console.log(counter2() + count1);
    })
  );

  return (
    <div>
      <button onClick={() => setCounter1((prev) => prev + 1)}>
        Increase Counter 1
      </button>
      <button onClick={() => setCounter2((prev) => prev + 1)}>
        Increase Counter 2
      </button>
      <p>Counter 1 value is {counter1()}</p>
      <p>Counter 2 value is {counter2()}</p>
    </div>
  );
};

export const AdvancedEffect6 = () => {
  const [count, setCount] = createSignal(0);

  const obsv$ = observable(count);

  const signal = from(obsv$);

  createEffect(() => {
    console.log("effect");
    obsv$.subscribe((x) => {
      console.log("subscription =", x);
    });
  });

  createEffect(() => {
    console.log("signal=", signal());
  });

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increase Counter
      </button>
      <p>Counter value is {count()}</p>
    </div>
  );
};
