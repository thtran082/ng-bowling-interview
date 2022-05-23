import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, of, switchMap } from "rxjs";
import { isSpare, storeRoll } from "../actions/frame.actions";

export interface IFrame {
  rolls: any[];
  score: number;
  bonus: string;
}

@Injectable({
  providedIn:  'root',
})
export class FrameService {
  private _rolls: any[] = [];
  private _score: number = 0;
  private _bonus: string = '';

  public frame$: Observable<IFrame>;

  constructor(private store: Store<{frame: IFrame}>) {
    this.frame$ = this.store.select('frame');
  }

  public roll(pinsKnocked: number) {
    this._storeRoll(pinsKnocked);
    if (this._rolls.length === 0) {
      if (pinsKnocked === 10) {
        this._bonus = 'strike';
      }
    } else {
      this._isSpare();
    }
  }

  public setDefaultValues() {
    this._rolls = [];
    this._score = 0;
    this._bonus = '';
  }

  public _storeRoll(pinsKnocked: number) {
    this.store.dispatch(storeRoll({pinsKnocked}));
  }

  public _isSpare() {
    this.store.dispatch(isSpare());
  }
}
