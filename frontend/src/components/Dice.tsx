import React, { useState, useEffect } from 'react';
import styles from './Dice.module.css';

interface DiceProps {
  sides: string[];
}

function Dice({ sides }: DiceProps) {
  const [diceFace, setDiceFace] = useState<string>(sides[0]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    setDiceFace(sides[0]); // Initialize with the first side
  }, [sides]);

  const rollDice = async () => {
    setIsRolling(true);
    try {
      // const response = await fetch('/dice/roll/'); // Assuming Django is serving static files
      // const data = await response.json();
      // setTimeout(() => {
      //   setDiceFace(data.dice_face);
      //   setIsRolling(false);
      // }, 1000); // Match animation duration
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * sides.length);
        setDiceFace(sides[randomIndex]);
        setIsRolling(false);
      }, 1000);
    } catch (error) {
      console.error('Error rolling dice:', error);
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