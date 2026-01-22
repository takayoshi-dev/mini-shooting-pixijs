import type { Seconds, Milliseconds } from "./brandedUnits";

export class BrandedCasts {
  public static toSeconds(n: number): Seconds {
    return n as Seconds;
  }

  public static toMilliseconds(n: number): Milliseconds {
    return n as Milliseconds;
  }

  public static toNumber(n: Milliseconds): number {
    return n as number;
  }
}
