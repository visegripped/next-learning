"use client";

// import { suits, cards } from "../../constants.mjs";
import Card from "@/app/components/card/Card";
import { useDroppable } from "@dnd-kit/core";

export default function Pile(props) {
  const {
    cards = {},
    doubleClickHandlerForLastCard,
    clickHandlerForLastCard,
    id = "",
    droppable = false,
  } = props;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const dragOverStyle = {
    backgroundColor: isOver ? "green" : undefined,
  };
  return (
    
    <ol
      className="list-decimal list-inside border p-4"
      style={dragOverStyle}
      ref={droppable ? setNodeRef : () => {}}
      data-pile={id}
    >
      {(() => {
        const elements = [];
        const sequence = cards.sequence || [];
        for (let i = 0; i < sequence.length; i++) {
          const card = sequence[i];
          const { isFaceUp, isDraggable } = cards.meta[card];
          if(id === 'wastePile') {
            console.log( ` isDraggable: ${isDraggable}`)
          }
          elements.push(
            <li key={`cards-${i}`}>
              <Card
                isFaceUp={isFaceUp}
                card={card}
                clickHandler={clickHandlerForLastCard && i === sequence.length - 1 ? clickHandlerForLastCard : undefined}
                doubleClickHandler={doubleClickHandlerForLastCard && i === sequence.length - 1 ? doubleClickHandlerForLastCard : undefined}
                isDraggable={isDraggable}
              />
            </li>
          );
        }

        return elements;
      })()}
    </ol>
  );
}
