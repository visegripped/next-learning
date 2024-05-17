"use client";

import { useDraggable } from "@dnd-kit/core";
import styles from "./Card.module.css";
import { CardInterface, SuitInterface, CardFaceInterface } from "@/app/types/solitaire.types";

interface CardProps {
  isFaceUp: boolean;
  isDraggable: boolean;
  card: CardInterface;
  source?: string; // Do we still need this?
  doubleClickHandler: Function | undefined;
  clickHandler: Function | undefined;
}

interface SVGProps {
  card: CardInterface;
}

export function CardSVG(props: SVGProps) {
  const {card} = props;
  const [face, suit] = card.split(':') as [CardFaceInterface, SuitInterface];

  const yPosForSuits = {
    heart: '0%',
    spade: '33.4%',
    diamond: '66.8%',
    club: '100%',
  }

  const xPosForFace = {
    ace: '0%',
    two: '8.33%',
    three: '16.66%',
    four: '25%',
    five: '33.33%',
    six: '41.66%',
    seven: '50%',
    eight: '58.33%',
    nine: '66.68%', //violates the pattern
    ten: '75%',
    jack: '83.33%',
    queen: '91.69%', //violates the pattern
    king: '100%',
  }


  return (
    <svg viewBox="0 0 5 7" style={{
      backgroundSize: '1300% 400%',
      backgroundPosition: `${xPosForFace[face]} ${yPosForSuits[suit]} `,
      backgroundImage: "url('card-sprite.png')",
      height: 'auto',
      width: '100%',
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      boxSizing: 'border-box',
    }}></svg>
  )
}


export default function Card(props: CardProps) {
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

    

  return (
    <div
      className={isFaceUp ? '' : styles.card__back}
      data-source={source}
      onClick={(e) => {
        clickHandler(e, card);
      }}
      onDoubleClick={(e) => {
        doubleClickHandler(e, card);
      }}
      {...(isDraggable && { style: draggableStyle, ref: setNodeRef, ...listeners, ...attributes })}
    >
      {isFaceUp ? <CardSVG card={card}></CardSVG> : <></>}
    </div>
  )
}
