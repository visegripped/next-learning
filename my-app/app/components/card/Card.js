"use client";

// import { suits, cards } from "../../constants.mjs";
import styles from "./Card.css";

export default function Tableau(props) {
  const {
    isFaceUp,
    card,
    doubleClickHandler = () => {
      console.log("no double click handler defined");
    },
    clickHandler = () => {
      console.log("no click handler defined");
    },
  } = props;
  const doubleClickHandlerWrapper = (event, props) => {
    doubleClickHandler(event, {card});
  }
  return isFaceUp ? (
    <div className={styles.card__front} onDoubleClick={doubleClickHandlerWrapper}>
      {card}
    </div>
  ) : (
    <div className={styles.card__back} onClick={clickHandler} >
      Card back {card}
    </div>
  );
}
