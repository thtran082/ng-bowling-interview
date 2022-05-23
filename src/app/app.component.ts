import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FrameService, IFrame } from './services/frame.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bowling-calculator-interview';
  public frame$: Observable<IFrame>;

  constructor(private store: Store<{ frame: any }>, private frameService: FrameService) {
    this.frame$ = frameService.frame$;
  }

  public hS(order: number): void {

  }

  public m64tew(code: string): void { }
}
