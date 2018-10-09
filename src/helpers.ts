import { BirdEvent } from "./event";

export class Helpers {
  public static distance(start: BirdEvent, stop: BirdEvent): number {
    return Math.sqrt(Math.pow(stop.xCord - start.xCord, 2) + Math.pow(stop.yCord - start.yCord, 2));
  }
  public static sortByTimestamp(k: string, events: BirdEvent[]): BirdEvent[] {
    return events.sort((b1, b2) => b1.timestamp === b2.timestamp ? 0 : b1.timestamp > b2.timestamp ? 1 : -1);
  }
}