import { Injectable } from '@angular/core';
import { FrameService } from './frame.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _frames: any = {};
  public firstRoll: number = 0;
  public secondRoll: number = 0;
  public thirdRoll: number = 0;

  constructor(private frame: FrameService) {}

  public getGameInfo() {
    return this._frames;
  }

  public storeFrame() {
    if (this._framesSize() < 1) {
      this._setFrame();
      this._frames[this._framesSize() + 1] = {
        rolls: [this.firstRoll, this.secondRoll],
        accumulator: this._frameScore(),
        bonus: this.frame.getFrameInfo().bonus,
      };
    } else {
      if (this._framesSize() + 1 < 10) {
        if (this._isBonus()) {
          this._setFrame();
          this._addBonus();
        } else {
          this._setFrame();
          this._addNoBonus();
        }
      } else {
        if (this.firstRoll === 10 || this._frameScore() === 10) {
          this._setFrame();
          this._addBonus();
          this._frames[this._framesSize()].accumulator += this.thirdRoll;
        } else {
          if (
            this._frames[this._framesSize() - 1].bonus !== null ||
            this._frames[this._framesSize()].bonus !== null
          ) {
            this._setFrame();
            this._addBonus();
          } else {
            this._setFrame();
            this._addNoBonus();
          }
        }
      }
    }
    this.frame.setDefaultValues();
  }

  public _isBonus() {
    return this._frames[this._framesSize()].bonus !== null;
  }

  public _addNoBonus() {
    this._frames[this._framesSize() + 1] = {
      rolls: [this.firstRoll, this.secondRoll],
      accumulator:
        this._frames[this._framesSize()].accumulator + this._frameScore(),
      bonus: this.frame.getFrameInfo().bonus,
    };
  }

  public _addBonus() {
    if (this._isSpare()) {
      this._frames[this._framesSize()].accumulator += this._Bonus();
      this._frames[this._framesSize() + 1] = {
        rolls: [this.firstRoll, this.secondRoll],
        accumulator:
          this._frames[this._framesSize()].accumulator + this._frameScore(),
        bonus: this.frame.getFrameInfo().bonus,
      };
    } else {
      if (
        this._framesSize() < 2 ||
        this._frames[this._framesSize() - 1].bonus !== 'strike'
      ) {
        this._frames[this._framesSize()].accumulator +=
          this.firstRoll + this.secondRoll;
        this._frames[this._framesSize() + 1] = {
          rolls: [this.firstRoll, this.secondRoll],
          accumulator:
            this._frames[this._framesSize()].accumulator + this._frameScore(),
          bonus: this.frame.getFrameInfo().bonus,
        };
      } else {
        this._frames[this._framesSize() - 1].accumulator += this.firstRoll;
        this._frames[this._framesSize()].accumulator +=
          this.firstRoll + this._frameScore();
        this._frames[this._framesSize() + 1] = {
          rolls: [this.firstRoll, this.secondRoll],
          accumulator:
            this._frames[this._framesSize()].accumulator + this._frameScore(),
          bonus: this.frame.getFrameInfo().bonus,
        };
      }
    }
  }

  public _frameScore() {
    return this.firstRoll + this.secondRoll;
  }

  public _Bonus() {
    var _bonusScore = this._frames[this._framesSize()].bonus;
    if (_bonusScore === 'strike') {
      return this.firstRoll + this.secondRoll;
    } else if (_bonusScore === 'spare') {
      return this.firstRoll;
    } else {
      return 0;
    }
  }

  public getTotal() {
    return this._frames[this._framesSize()].accumulator;
  }

  public _setFrame() {
    this.frame.roll(this.firstRoll);
    this.frame.roll(this.secondRoll);
  }

  public _isSpare() {
    if (this._framesSize() < 1) {
      return false;
    } else {
      return this._frames[this._framesSize()].bonus === 'spare';
    }
  }

  public _framesSize() {
    return Object.keys(this._frames).length;
  }
}
