import { createAction, props } from '@ngrx/store';

export const roll = createAction('[FRAME] ROLL');
export const storeRoll = createAction(
  '[FRAME] STORE ROLL',
  props<{ pinsKnocked: number }>()
);
export const isSpare = createAction('[FRAME] IS SPARE');
export const defaultValue = createAction('[FRAME] DEFAULT VALUE');
export const setBonusValue = createAction(
  '[FRAME] SET BONUS VALUE',
  props<{ bonus: string }>());

