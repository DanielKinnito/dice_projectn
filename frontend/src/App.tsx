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

  return (
    <div className="App">
      <h1>Dice Roller</h1>
      <div className="container">
        <div className="dice-area">
          <Dice sides={sides} />
        </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
