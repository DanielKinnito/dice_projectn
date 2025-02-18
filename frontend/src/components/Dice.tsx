import React, { useState } from 'react';
import styles from './Dice.module.css';

function Dice() {
  const [diceFace, setDiceFace] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = async () => {
    setIsRolling(true);
    try {
      const response = await fetch('/dice/roll/'); // Assuming Django is serving static files
      const data = await response.json();
      setTimeout(() => {
        setDiceFace(data.dice_face);
        setIsRolling(false);
      }, 1000); // Match animation duration
    } catch (error) {
      console.error("Error rolling dice:", error);
      setIsRolling(false);
    }
  };

  return (
    <div className={styles.diceContainer}>
      <div
        className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}
        data-face={diceFace}
        onClick={rollDice}
      >
        {/* Dice dots will be styled with CSS */}
      </div>
    </div>
  );
}

export default Dice;