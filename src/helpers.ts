import { BirdEvent } from "./event";

export class Helpers {
  
  public static distance(start: BirdEvent, stop: BirdEvent): number {
    return Math.sqrt(Math.pow(stop.xCord - start.xCord, 2) + Math.pow(stop.yCord - start.yCord, 2));
  }

  public static sortByTimestamp(events: BirdEvent[]): BirdEvent[] {
    return events.sort((b1, b2) => b1.timestamp === b2.timestamp ? 0 : b1.timestamp > b2.timestamp ? 1 : -1);
  }
  
  public static calculateCost(start: BirdEvent, stop: BirdEvent): number {
    let totalSeconds: number = stop.timestamp - start.timestamp - 60;

    if (totalSeconds < 0) {
      return 0;
    }

    // weird javascript math error here.  
    // if you evaluate 1.15 + .15 the answer is 1.2999999999999998
    // by splitting the 1 and the .15 up and add to .15, we recieve the expected answer 1.3
    return 1 + (.15 + (.15 * Math.ceil(totalSeconds / 60)));
  }
}