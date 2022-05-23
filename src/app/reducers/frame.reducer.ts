import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { isSpare, roll, storeRoll } from '../actions/frame.actions';
import { IFrame } from '../services/frame.service';

export const initialState: IFrame = {
  rolls: new Array(0),
  score: 0,
  bonus: '',
};

export const frameReducer = createReducer(
  initialState,
  on(storeRoll, (state, { pinsKnocked }) => ({
    ...state,
    score: pinsKnocked + state.score,
    rolls: [...state.rolls, pinsKnocked],
  })),
  on(isSpare, (state) => ({
    ...state,
    bonus: state.score === 10 && state.rolls[0] < 10 ? 'spare' : state.bonus,
  }))
);
