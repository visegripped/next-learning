"use client";
import { suits } from "@/app/constants.mjs";
import { useSolitaireContext } from "@/app/context/Solitaire.context";
import Pile from "@/app/components/pile/Pile";
import { PilesInterface } from "@/app/types/solitaire.types";
import styles from './buildPiles.module.css'

export default function BuildPiles() {
  const { state }: { state: PilesInterface } = useSolitaireContext();
  return (
    <>
      {(() => {
        const elements = [];
        for (let i = 0; i < suits.length; i++) {
          const suit = suits[i];
          elements.push(
            <div
              className="bg-slate-600 flex flex-col" //remove flex col when the H2 is removed.
              key={`suits-${i}`}
            >
              <h2>{suit}</h2>
              <Pile pileId={`build_${suit}`} droppable={true} cssClassName={styles.cards} />
            </div>,
          );
        }

        return elements;
      })()}
    </>
  );
}
