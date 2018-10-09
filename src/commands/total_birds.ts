import { Command } from "./command";
import { EventMaps } from "../event_maps";
import { EventType } from "../event";

export class TotalBirdsCommand implements Command {
  constructor(private events: EventMaps) {
  }
  run() : string {
    const totalBirds = this.events.byType[EventType.Drop].length;
    return `Total number of Birds dropped off in the simulation: ${totalBirds}.`;
  }
}