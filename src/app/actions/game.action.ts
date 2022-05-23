import { createAction, props } from "@ngrx/store";
import { Game } from "../reducers/game.reducer";
import { Frame } from "../services/game.service";

export const setGame = createAction('[GAME] set game', props<{ game: Frame[] }>());
export const findRecord = createAction('[GAME] find record', props<{ index: number, frame: Frame }>());