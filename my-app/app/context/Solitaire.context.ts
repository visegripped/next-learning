import { Dispatch, useContext, createContext } from "react";
import { ActionInterface } from "@/app/reducers/solitaire.reducer";
import { PilesInterface } from "../types/solitaire.types";

interface IContextProps {
  state: PilesInterface;
  dispatch: Dispatch<ActionInterface>;
}

const SolitaireContext = createContext({} as IContextProps);

export function useSolitaireContext() {
  return useContext(SolitaireContext);
}

export default SolitaireContext;
