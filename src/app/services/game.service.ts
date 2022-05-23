import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { findRecord, setGame } from '../actions/game.action';
import { RootReducer } from '../reducers/root.reducer';
import { FrameService } from './frame.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _game: Frame[] = [];

  constructor(private store: Store<RootReducer>) {
  }

  public setGame(targetScore: number) {
    if (
      this._game[this._game.length - 1]?.value?.rolls?.length > 0
      && this._game[this._game.length - 1]?.value?.rolls?.length < 2
      && this._game[this._game.length -1]?.value?.score !== 10
    ) {
      this._game[this._game.length - 1].roll(targetScore);
      this.store.dispatch(
        findRecord({
          index: this._game.length - 1,
          frame: this._game[this._game.length - 1]
        })
      );
    } else {
      const frame = new Frame();
      frame.roll(targetScore);
      this._game.push(frame);
      this.store.dispatch(
        setGame({ game: JSON.parse(JSON.stringify(this._game)) })
      );
    }
  }

  public get game() {
    return this._game;
  }
}


export class Frame {
  private _rolls: any[] = [];
  private _score: number = 0;
  private _bonus: BonusEnum = BonusEnum.EMPTY;

  public roll(targetScore: number) {
    this._rolls = Object.assign([], [...this._rolls]);
    this._rolls.push(targetScore);
    
    this._score += targetScore;
    if (targetScore === 10) {
      this._bonus = BonusEnum.STRIKE;
    } else {
      if (this._rolls.length === 2) {
        this._score = this._rolls[0] + this._rolls[1];
        this._bonus = this._score === 10 ? BonusEnum.SPARE : BonusEnum.EMPTY;
      }
    }
  }

  public get value() {
    return {
      rolls: this._rolls,
      score: this._score,
      bonus: this._bonus,
    }
  }

  public clearAllValue() {
    this._rolls = [];
    this._score = 0;
    this._bonus = BonusEnum.EMPTY;
  }
}

export enum BonusEnum {
  EMPTY = '',
  STRIKE = 'strike',
  SPARE = 'spare',
}