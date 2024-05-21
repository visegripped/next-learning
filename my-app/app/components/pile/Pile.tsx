"use client";

import Card from "@/app/components/card/Card";
import { useDroppable } from "@dnd-kit/core";
import { PileIdsInterface, CardInterface } from "@/app/types/solitaire.types";
import { useSolitaireContext } from "@/app/context/Solitaire.context";

interface PileProps {
  doubleClickHandlerForLastCard?: Function;
  clickHandlerForLastCard?: Function;
  pileId: PileIdsInterface;
  droppable?: boolean;
  cssClassName?: string;
}
export default function Pile(props: PileProps) {
  const {
    doubleClickHandlerForLastCard,
    clickHandlerForLastCard,
    pileId,
    droppable = false,
    cssClassName = "",
  } = props;
  const { state, dispatch } = useSolitaireContext();
  const { isOver, setNodeRef } = useDroppable({
    id: pileId,
  });
  const dragOverStyle = {
    backgroundColor: isOver ? "green" : undefined,
  };
  const pile = state[pileId];
  return (
    <ol
      className={`list-inside border flex-1 ${cssClassName}`} // list-decimal
      style={dragOverStyle}
      ref={droppable ? setNodeRef : () => {}}
      data-pile={pileId}
      data-testid={`pile_${pileId}`}
    >
      {(() => {
        const elements = [];
        const sequence = pile?.sequence || [];
        for (let i = 0; i < sequence.length; i++) {
          const card = sequence[i] as CardInterface;
          const { isFaceUp, isDraggable } = pile.meta[card];
          elements.push(
            <li key={`${pileId}-${card}`}>
              <Card
                isFaceUp={isFaceUp}
                card={card}
                clickHandler={
                  clickHandlerForLastCard && i === sequence.length - 1
                    ? clickHandlerForLastCard
                    : undefined
                }
                doubleClickHandler={
                  doubleClickHandlerForLastCard && i === sequence.length - 1
                    ? doubleClickHandlerForLastCard
                    : undefined
                }
                isDraggable={isDraggable}
              />
            </li>,
          );
        }

        return elements;
      })()}
    </ol>
  );
}
