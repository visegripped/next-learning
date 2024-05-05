"use client";

import { useDraggable } from "@dnd-kit/core";
import styles from "./Card.module.css";

export default function Tableau(props) {
  const {
    isFaceUp,
    card,
    source = "",
    doubleClickHandler = () => {
      console.log("no double click handler defined");
    },
    clickHandler = () => {
      console.log("no click handler defined");
    },
  } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card,
  });
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return isFaceUp ? (
    <div
      className={styles.card__front}
      data-source={source}
      onDoubleClick={(e) => {doubleClickHandler(e, card)}}
      style={draggableStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {card}
    </div>
  ) : (
    <div className={styles.card__back} onClick={(e) => {clickHandler(e, card)}}>
      Card back {card}
    </div>
  );
}
