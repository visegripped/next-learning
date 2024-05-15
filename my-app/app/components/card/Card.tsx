"use client";

import { useDraggable } from "@dnd-kit/core";
import styles from "./Card.module.css";

interface CardProps {
  isFaceUp: boolean;
  isDraggable: boolean;
  card: string;
  source?: string; // Do we still need this?
  doubleClickHandler: Function | undefined;
  clickHandler: Function | undefined;
}

export default function Tableau(props: CardProps) {
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
  const isFaceUpClassname = styles[`card__${isFaceUp ? "front" : "back"}`];
  let suitClassName = '';
  let faceClassName = '';
  if(isFaceUp) {
    const [face, suit] = card.split(":");
    suitClassName = styles[suit];
    faceClassName = styles[face];
  }

  let cssClasses = `${isFaceUpClassname} ${faceClassName} ${suitClassName}`;

  return isDraggable ? (
    <div
      className={cssClasses}
      data-source={source}
      onClick={(e) => {
        clickHandler(e, card);
      }}
      onDoubleClick={(e) => {
        doubleClickHandler(e, card);
      }}
      style={draggableStyle}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {card}
    </div>
  ) : (
    <div
      className={cssClasses}
      onClick={(e) => {
        clickHandler(e, card);
      }}
      onDoubleClick={(e) => {
        doubleClickHandler(e, card);
      }}
    >
      {isFaceUp ? card : ``}
      {/* here for testing purposes only */}
    </div>
  );
}
