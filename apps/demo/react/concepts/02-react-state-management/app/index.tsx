import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  const tableRef = useRef<string[]>([]);

  return (
    <>
      <h1>Local state management</h1>
      <h2>useState: reactive, triggers re-render</h2>
      <div>
        <button onClick={() => setCount((prev) => prev - 1)}>decrement</button>
        <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
      </div>
      <p>state: {count}</p>
      <p>
        Use when you want a reactive UI, e.g. show/hide components, toggle
        modals etc...
      </p>
      <h2>useRef: not reactive, triggers no re-render</h2>
      <p>
        Use to refer to data, or other values that you want to keep track of
        which are not reactive.
      </p>
      <div>
        <button onClick={() => (countRef.current -= 1)}>decrement</button>
        <button onClick={() => (countRef.current += 1)}>increment</button>

        <p>ref: {countRef.current}</p>
        <p>
          the ref value is not reactive, it does not trigger a re-render, but
          the value is updated. If you want to see the updated value, you can
          update the state counter which will trigger a re-render.
        </p>
      </div>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Force re-render by incrementing the state with setCount
      </button>

      <hr />
      <h2>When to useRef?</h2>
      <p>
        when you want to avoid re-rendering of the UI. e.g. in a table with a
        lot of rows where you are editing the values uncontrolled. Type some
        stuff in the input fields and click the button below to see the values
        inside the tableRef
      </p>
      <h2>Editable Table with useRef</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Item {index + 1}</td>
              <td>
                <input
                  defaultValue=""
                  onChange={(e) => {
                    tableRef.current[index] = e.target.value;
                  }}
                  type="text"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>
          When using useState the UI will re-render for each value change in the
          input field. This is a performance issue when you have a lot of rows.
          In this case, you can use useRef to avoid re-rendering the UI.
        </p>
      </div>

      <h3>result</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Show what is inside my tableref, by rerendering and incrementing the
        state with setCount
      </button>

      <p>
        The contents inside my tableRef is only being displayed when triggering
        a re-render
      </p>

      {tableRef.current.map((value, index) => (
        <span key={index}>
          {value}
          {index < tableRef.current.length - 1 ? ', ' : ''}
        </span>
      ))}
      <hr />
      <h1>Global state management with store</h1>
      <p>
        Used with client interaction that needs to be shared across components.
        <p>
          <strong>DO NOT USE IT TO STORE DATASETS!!!</strong>
        </p>
        Keep the client state fast, light and simple. Because the store triggers
        re-renders, large datasets will re-render as well if being stored in the
        store.
      </p>
    </>
  );
}

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
