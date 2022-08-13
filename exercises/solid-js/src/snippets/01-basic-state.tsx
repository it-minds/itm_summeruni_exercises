/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";

export const BasicState1 = () => {
  const [count, setCount] = createSignal(0);

  return <div>Count value is {count()}</div>;
};

export const BasicState2 = () => {
  const [count, setCount] = createSignal(0);

  const doubledCount = () => 2 * count();

  const increaseCount = () => setCount((prev) => prev + 1);

  return (
    <div>
      <button onClick={increaseCount}>Click</button>
      <p>Count value is {doubledCount()}</p>
    </div>
  );
};

export const BasicState3 = () => {
  const [count, setCount] = createSignal(0, { equals: false });

  const setToTwo = () => setCount(2);

  console.log("render");

  return (
    <div>
      <button onClick={setToTwo}>Click</button>
      <p>Count value is {count()}</p>
    </div>
  );
};

export const BasicState4 = () => {
  const [obj, setObj] = createSignal(
    {
      id: "abc1",
      name: "name that isn't important",
    },
    { equals: false }
  );

  const updateName = () =>
    setObj((cur) => {
      cur.name = "new name shouldn't trigger update";
      return cur;
    });

  const updateId = () =>
    setObj((cur) => {
      cur.id = "abc2";
      return cur;
    });

  console.log("render");

  return (
    <div>
      <button onClick={updateName}>Update Name</button>
      <button onClick={updateId}>Update ID</button>
      <p>ID: {obj().id}</p>
      <p>Name: {obj().name}</p>
    </div>
  );
};

export const BasicState5 = () => {
  const [obj, setObj] = createSignal(
    {
      id: "abc1",
      name: "name that isn't important",
    },
    { equals: (a, b) => a.id !== b.id }
  );

  const updateName = () =>
    setObj((cur) => {
      cur.name = "new name shouldn't trigger update";
      return cur;
    });

  const updateId = () =>
    setObj((cur) => {
      cur.id = "abc2";
      return cur;
    });

  console.log("render");

  return (
    <div>
      <button onClick={updateName}>Update Name</button>
      <button onClick={updateId}>Update ID</button>
      <p>ID: {obj().id}</p>
      <p>Name: {obj().name}</p>
    </div>
  );
};
