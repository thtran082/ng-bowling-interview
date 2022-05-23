import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from './reducers/game.reducer';
import { RootReducer } from './reducers/root.reducer';
import { FrameService, IFrame } from './services/frame.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bowling-calculator-interview';
  public frame$: Observable<IFrame>;
  public game$: Observable<Game>

  constructor(private store: Store<RootReducer>, private frameService: FrameService, private gameService: GameService) {
    this.frame$ = frameService.frame$;
    this.game$ = store.select(p => p.game);
  }

  public get mygame() {
    return this.gameService.game;
  }

  public hS(order: number): void {
    this.gameService.setGame(order);
  }

  public m64tew(code: string): void { }
}
