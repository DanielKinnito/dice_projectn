import React, { useState, useEffect } from 'react';
import styles from './Dice.module.css';

interface DiceProps {
  sides: string[];
}

function Dice({ sides }: DiceProps) {
  const [diceFace, setDiceFace] = useState<number>(0); // Initialize with 0
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    console.log("Sides Array:", sides);
  }, [sides]);

  const rollDice = async () => {
    setIsRolling(true);
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_CALL;
      const response = await fetch(`${apiUrl}/dice/roll/`);
      const data = await response.json();
      console.log("API Response:", data);
      setTimeout(() => {
        setDiceFace(data.dice_face - 1); // Store the index (0-5)
        setIsRolling(false);
      }, 2000);
    } catch (error) {
      console.error('Error rolling dice:', error);
      setIsRolling(false);
    }
  };

  return (
    <div className={styles.diceContainer}>
      <div className={`${styles.dice} ${isRolling ? styles.rolling : ''}`} onClick={rollDice}>
        <div className={styles.face}>{sides[diceFace]}</div>
        <div className={styles.face}>{sides[(diceFace + 1) % 6]}</div>
        <div className={styles.face}>{sides[(diceFace + 2) % 6]}</div>
        <div className={styles.face}>{sides[(diceFace + 3) % 6]}</div>
        <div className={styles.face}>{sides[(diceFace + 4) % 6]}</div>
        <div className={styles.face}>{sides[(diceFace + 5) % 6]}</div>
      </div>
    </div>
  );
}

export default Dice;