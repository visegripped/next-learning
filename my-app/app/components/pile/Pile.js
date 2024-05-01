"use client";

// import { suits, cards } from "../../constants.mjs";
import Card from "@/app/components/card/Card";
import { useDroppable } from "@dnd-kit/core";

export const showCardFace = (behavior, isLastCard) => {
  if (behavior === "showLastCard" && isLastCard) {
    return true;
  } else if (behavior === "up") {
    return true;
  }
  return false;
};

export default function Pile(props) {
  const {
    cards = [],
    doubleClickHandler,
    clickHandler,
    id = "",
    droppable = false,
    cardFaceBehavior = "down",
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
        for (let i = 0; i < cards.length; i++) {
          const CardisFaceUp = showCardFace(
            cardFaceBehavior,
            i === cards.length - 1
          );
          const singleClick =
            i === cards.length - 1 && typeof clickHandler === "function"
              ? clickHandler
              : () => {
                  console.log("Pile: no click handler defined");
                };
          const doubleClick =
            i === cards.length - 1 && typeof doubleClickHandler === "function"
              ? doubleClickHandler
              : () => {};
          elements.push(
            <li key={`cards-${i}`}>
              <Card
                isFaceUp={CardisFaceUp}
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
