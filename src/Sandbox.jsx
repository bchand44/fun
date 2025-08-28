import React, { useState } from 'react';

export default function Sandbox() {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="page">
      <h2>UI Automation Sandbox</h2>
      <p>Try automating these actions:</p>
      <button onClick={() => setClicked(true)} data-testid="click-btn">
        Click Me
      </button>
      {clicked && <span data-testid="clicked-msg">Button clicked!</span>}
      <br /><br />
      <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={e => setInput(e.target.value)}
        data-testid="input-box"
      />
      {input && <span data-testid="input-msg">You typed: {input}</span>}
    </div>
  );
}
