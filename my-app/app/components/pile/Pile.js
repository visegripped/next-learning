"use client";

// import { suits, cards } from "../../constants.mjs";
import Card from '../card/Card'
import {useDroppable} from '@dnd-kit/core';
export default function Pile(props) {
  const { cards = [], areFacedUp, doubleClickHandler, clickHandler, id = '', droppable = false} = props;
  const {isOver, setNodeRef} = useDroppable({
    id,
  });
  const dragOverStyle = {
    backgroundColor: isOver ? 'green' : undefined,
  };

  return (
    <ol className="list-decimal list-inside border p-4" style={dragOverStyle} ref={droppable ? setNodeRef : () => {}}>
      {(() => {
        const elements = [];
        for (let i = 0; i < cards.length; i++) {
          const singleClick =
            i === cards.length-1 && typeof clickHandler === "function"
              ? clickHandler
              : () => {console.log('Pile: no click handler defined')};
          const doubleClick =
            i === cards.length-1 && typeof doubleClickHandler === "function"
              ? doubleClickHandler
              : () => {};
          elements.push(
            <li key={`cards-${i}`}>
              <Card
                isFaceUp={areFacedUp}
                card={cards[i]}
                clickHandler={singleClick}
                doubleClickHandler={doubleClick}
              />
            </li>
          );
        }

        return elements;
      })()}
    </ol>
  );
}
