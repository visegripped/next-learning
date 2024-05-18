import { CardFaceInterface, CardInterface } from "@/app/types/solitaire.types";
const isCardRed = (card: CardFaceInterface | CardInterface) => {
  return !!(card && (card.includes("diamond") || card.includes("heart")));
};

export default isCardRed;
