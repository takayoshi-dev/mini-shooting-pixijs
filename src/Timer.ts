import type { Milliseconds } from "@/brandedTypes";
import { BrandedCasts } from "@/brandedTypes";

export class Timer {
  private timerCount: Milliseconds;
  private timerDuration: Milliseconds;

  constructor(td: Milliseconds) {
    this.timerDuration = td;
    this.timerCount = this.timerDuration;
  }

  public startTimer(): void {
    this.timerCount = this.timerDuration;
  }

  public updateTimer(deltaMS: Milliseconds): void {
    if (this.isTimerFinished()) {
      return;
    }

    const numDeltaMS: number = BrandedCasts.toNumber(deltaMS);
    const numTimerCount: number = BrandedCasts.toNumber(this.timerCount);
    let result: number = numTimerCount - numDeltaMS;
    if (result < 0) {
      result = 0;
    }
    this.timerCount = BrandedCasts.toMilliseconds(result);
  }

  public isTimerFinished(): boolean {
    const numTimerCount: number = BrandedCasts.toNumber(this.timerCount);

    let result = false;
    if (numTimerCount <= 0) {
      result = true;
    }
    return result;
  }
}
