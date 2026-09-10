import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page-container">
      <section>
        <h1>Get started</h1>
        <div>{count}</div>
        <button
          aria-label="Count"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>
      </section>
    </div>
  );
}

export default App;
