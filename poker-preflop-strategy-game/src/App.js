import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const handleSave = () => {
    localStorage.setItem('savedText', text);
    setText(''); // Clear text after saving
  };

  const handleGet = () => {
    setSavedText(localStorage.getItem('savedText') || '');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <div>
          <button onClick={handleSave}>Save Text</button>
          <button onClick={handleGet}>Get Text</button>
        </div>
        {savedText && <p>Saved Text: {savedText}</p>}
      </header>
    </div>
  );
}

export default App;
