'use client'

import { suits, cards } from '../../constants.mjs';
import styles from './Card.css';

export default function Tableau(props) {
  const { isFaceUp, card, faceUpCardClickHandler = () => {console.log('no click handler defined')}, faceDownCardClickHandler = () => {console.log('no click handler defined')} } = props;
  return isFaceUp ? <div className={styles.card__front} onDoubleClick={faceUpCardClickHandler}>{card}</div> : <div className={styles.card__back} onClick={faceDownCardClickHandler}>Card back</div>;
}
