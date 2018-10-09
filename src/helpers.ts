import { BirdEvent } from "./event";

export class Helpers {
  public static distance(start: BirdEvent, stop: BirdEvent): number {
    return Math.sqrt(Math.pow(stop.xCord - start.xCord, 2) + Math.pow(stop.yCord - start.yCord, 2));
  }
}