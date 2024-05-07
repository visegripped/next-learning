import { CardFaceInterface } from "@/app/types/solitaire.types";
const isCardRed = (card: CardFaceInterface) => {
  return !!(card && (card.includes("diamond") || card.includes("heart")));
};

export default isCardRed;
