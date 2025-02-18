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
      const apiUrl = import.meta.env.VITE_REACT_APP_API_CALL;
      const response = await fetch(`${apiUrl}/dice/roll/`);
      const data = await response.json();
      if (response.ok) {
      setTimeout(() => {
        setDiceFace(sides[data.dice_face - 1]); // Use backend result
        setIsRolling(false);
      }, 2000); // Adjusted animation duration
    }
      else{
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * sides.length);
          setDiceFace(sides[randomIndex]);
          setIsRolling(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error rolling dice:', error);
      setIsRolling(false);
    }
  };

  return (
    <div className={styles.diceContainer}>
      <div className={`${styles.dice} ${isRolling ? styles.rolling : ''}`} onClick={rollDice}>
        <div className={styles.face} data-side={sides[0]}></div>
        <div className={styles.face} data-side={sides[1]}></div>
        <div className={styles.face} data-side={sides[2]}></div>
        <div className={styles.face} data-side={sides[3]}></div>
        <div className={styles.face} data-side={sides[4]}></div>
        <div className={styles.face} data-side={sides[5]}></div>
      </div>
    </div>
  );
}

export default Dice;