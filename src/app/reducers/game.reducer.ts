import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { findRecord, setGame } from "../actions/game.action";
import { Frame } from "../services/game.service"

export interface Game {
  game: Frame[];
}

export const initialState: Game = {
  game: []
};

export const gameReducer = createReducer(
  initialState,
  on(setGame, (state, { game }) => {
    return {
      ...state,
      game: [...game],
    }
  }),
  on(findRecord, (state, { frame, index }) => {
    const mappedGames = [...state.game];
    mappedGames[index] = frame;
    return {
      ...state,
      game: mappedGames
    }
  })
)