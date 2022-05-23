import { Frame } from "../services/game.service";
import { frameReducer } from "./frame.reducer";
import { Game, gameReducer } from "./game.reducer";

export const rootReducer = {
  frame: frameReducer,
  game: gameReducer,
};

export interface RootReducer {
  frame: Frame,
  game: Game,
}