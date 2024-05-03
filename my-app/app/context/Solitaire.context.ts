import React, {Dispatch} from 'react';
import {ActionInterface} from '@/app/reducers/solitaire.reducer';
import { PilesInterface } from '../types/solitaire.types';

interface IContextProps {
  state: PilesInterface;
  dispatch:Dispatch<ActionInterface>
}

const SolitaireContext = React.createContext({} as IContextProps);

export function useSolitaireContext() {
  return React.useContext(SolitaireContext);
}

export default SolitaireContext;