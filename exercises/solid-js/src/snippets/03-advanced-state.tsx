/** @jsxImportSource solid-js */

import {
  Accessor,
  createMemo,
  createResource,
  createSignal,
  For,
} from "solid-js";
import { createStore } from "solid-js/store";
import { ReversePolishNotationCalc } from "./extras/polish-notation";

export const AdvanceState1 = () => {
  const [input, setInput] = createSignal("");

  const sum = createMemo(() => ReversePolishNotationCalc(input()));

  return (
    <div>
      <label for="polish-input-1">Polish Input</label>
      <input
        id="polish-input-1"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
      ></input>
      <p>Count value is {sum()}</p>
    </div>
  );
};

export const AdvanceState2 = () => {
  const [input, setInput] = createSignal("");

  const runningsum = createMemo<number>(
    (prev) => prev + ReversePolishNotationCalc(input()),
    0
  );

  return (
    <div>
      <label for="polish-input-2">Polish Input</label>
      <input
        id="polish-input-2"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
      ></input>
      <p>Count value is {runningsum()}</p>
    </div>
  );
};

export const AdvanceState3 = () => {
  const [input, setInput] = createSignal("");

  const highestNumber = createMemo<number>(
    () => ReversePolishNotationCalc(input()),
    0,
    {
      equals(prev, next) {
        return prev > next;
      },
    }
  );

  return (
    <div>
      <label for="polish-input-3">Polish Input</label>
      <input
        id="polish-input-3"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
      ></input>
      <p>Count value is {highestNumber()}</p>
    </div>
  );
};

const AsyncReversePolishNotationCalc = (
  input: string,
  waitTime: number = 10
): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(ReversePolishNotationCalc(input)), waitTime);
  });

export const AdvanceState4 = () => {
  const [input, setInput] = createSignal("");

  const [wontWork] = createResource(() =>
    AsyncReversePolishNotationCalc(input())
  );

  const [data] = createResource<number, string>(input, (source) =>
    AsyncReversePolishNotationCalc(source)
  );

  return (
    <div>
      <label for="polish-input-4">Polish Input</label>
      <input
        id="polish-input-4"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
      ></input>
      <p>Wont work value is {wontWork()}</p>
      <p>Count value is {data()}</p>
    </div>
  );
};

export const AdvanceState5 = () => {
  const [input, setInput] = createSignal("1 4 -");
  const [coef, setCoef] = createSignal(0.5);

  const [result, { refetch, mutate }] = createResource<
    number | string,
    [Accessor<string>, Accessor<number>]
  >([input, coef], async ([source1, source2], { refetching }) => {
    if (!refetching) return 0;
    const result = await AsyncReversePolishNotationCalc(source1(), 3000);
    return result * source2();
  });

  const sources = createMemo<[string, number]>(() => [input(), coef()]);

  const [result2] = createResource(
    sources,
    async ([source1, source2], { refetching }) => {
      if (!refetching) return 0;
      const result = await AsyncReversePolishNotationCalc(source1, 3000);
      return result * source2;
    }
  );

  const [result3] = createResource(
    createMemo<[string, number]>(() => [input(), coef()]),
    async ([input, coef], { refetching }) => {
      if (!refetching) return 0;
      const result = await AsyncReversePolishNotationCalc(input, 3000);
      return result * coef;
    }
  );

  return (
    <div>
      <div>
        <label for="coefficient">Coefficient</label>
        <input
          id="coefficient"
          type="number"
          value={coef()}
          onInput={(e) => setCoef(e.currentTarget.valueAsNumber)}
        ></input>
      </div>
      <div>
        <label for="polish-input-5">Polish Input</label>
        <input
          id="polish-input-5"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        ></input>
      </div>
      <button
        disabled={result.loading}
        onClick={() => {
          mutate("calculating...");
          refetch();
        }}
      >
        Calculate
      </button>
      <p>Count value is {result()}</p>
    </div>
  );
};

export const AdvanceState6 = () => {
  const [input, setInput] = createSignal("");
  const [todos, setTodos] = createStore([
    { id: 1, title: "Listen to Martin talk gibberish", done: true },
    { id: 2, title: "Learn a New Framework", done: false },
  ]);

  const addTodo = (title: string) =>
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title,
        done: false,
      },
    ]);

  return (
    <div>
      <For each={todos}>
        {(todo, i) => {
          console.log("rendering todo", todo.id);
          return (
            <div style={{ display: "flex", "flex-direction": "row" }}>
              <input
                title="todo-input-checkbox"
                type="checkbox"
                checked={todo.done}
                onInput={(e) =>
                  setTodos(i(), (prev) => ({
                    ...prev,
                    done: e.currentTarget.checked,
                  }))
                }
              />
              <p style={todo.done ? { "text-decoration": "line-through" } : {}}>
                {todo.title}
              </p>
            </div>
          );
        }}
      </For>

      <div>
        <label for="todo-input">New Todo:</label>
        <input
          id="todo-input"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
        ></input>
      </div>
      <button
        type="button"
        onClick={() => {
          addTodo(input());
          setInput("");
        }}
      >
        Add
      </button>
    </div>
  );
};
