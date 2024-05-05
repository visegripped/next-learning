"use client";

import { useDraggable } from "@dnd-kit/core";
import styles from "./Card.module.css";

export default function Tableau(props) {
  const {
    isFaceUp,
    isDraggable,
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
  const cssClasses = styles[`card__${isFaceUp ? 'front' : 'back'}`]

  return isDraggable ? (
    <div
      className={cssClasses}
      data-source={source}
      onClick={(e) => {clickHandler(e, card)}}
      onDoubleClick={(e) => {doubleClickHandler(e, card)}}
      style={draggableStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {card}
    </div>
  ) : (
    <div className={cssClasses} 
    onClick={(e) => {clickHandler(e, card)}}
    onDoubleClick={(e) => {doubleClickHandler(e, card)}}
    >
      {isFaceUp ? card: `card back ${card}`} {/* here for testing purposes only */}
    </div>
  );
}
