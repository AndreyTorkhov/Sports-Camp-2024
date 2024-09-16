import React from "react";
import styles from "./RatingButtons.module.scss";

interface RatingButtonsProps {
  ratingDifference: number;
}

const RatingButtons: React.FC<RatingButtonsProps> = ({ ratingDifference }) => (
  <div className={styles.ratingButtons}>
    <button className={styles.ratingButton}>+</button>
    <span className={styles.ratingResult}>{ratingDifference}</span>
    <button className={styles.ratingButton}>-</button>
  </div>
);

export default RatingButtons;
