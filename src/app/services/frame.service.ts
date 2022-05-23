import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Observable, of, switchMap, tap } from "rxjs";
import { defaultValue, isSpare, setBonusValue, storeRoll } from "../actions/frame.actions";
import { initialState as initFrameState } from "../reducers/frame.reducer";

export interface IFrame {
  rolls: any[];
  score: number;
  bonus: string;
}

@Injectable({
  providedIn: 'root',
})
export class FrameService {

  public frame$: Observable<IFrame>;
  public frame: BehaviorSubject<IFrame> = new BehaviorSubject(initFrameState);

  constructor(private store: Store<{ frame: IFrame }>) {
    this.frame$ = this.store.select('frame').pipe(
      tap((val) => this.frame.next(val))
    );
  }

  public roll(pinsKnocked: number) {
    if (this.frame.value.rolls.length === 0) {
      this.store.dispatch(storeRoll({ pinsKnocked }));
      if (pinsKnocked === 10) {
        this.store.dispatch(setBonusValue({ bonus: 'strike' }));
      }
    } else {
      this.store.dispatch(storeRoll({ pinsKnocked }));
      this.store.dispatch(isSpare());
      
    }
  }

  public setDefaultValues() {
    this.store.dispatch(defaultValue());
  }
}
