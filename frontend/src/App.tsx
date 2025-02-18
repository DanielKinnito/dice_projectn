import React, { useState } from 'react';
import Dice from './components/Dice';
import './App.css';

interface AppProps {
  sides: string[];
}

function App() {
  const [sides, setSides] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]);

  const handleSideChange = (index: number, value: string) => {
    const newSides = [...sides];
    newSides[index] = value;
    setSides(newSides);
  };

  const addSide = () => {
    setSides([...sides, '']);
  };

  const removeSide = (index: number) => {
    const newSides = [...sides];
    newSides.splice(index, 1);
    setSides(newSides);
  };

  return (
    <div className="App">
      <h1>Dice Roller</h1>
      <div className="container">
        <div className="sidebar">
          <h2>Customize Sides</h2>
          {sides.map((side, index) => (
            <div key={index} className="side-input">
              <label htmlFor={`side-${index}`}>Side {index + 1}:</label>
              <input
                type="text"
                id={`side-${index}`}
                value={side}
                onChange={(e) => handleSideChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeSide(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSide}>
            Add Side
          </button>
        </div>
        <div className="dice-area">
          <Dice sides={sides} />
        </div>
      </div>
    </div>
  );
}

export default App;
