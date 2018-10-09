import { Command } from "./command";
import { BirdEvent, EventType } from "../event";
import { Helpers } from "../helpers";
import { EventMaps } from "../event_maps";

export class FarthestFromDropPointCommand implements Command {
  constructor(private events: EventMaps) {
  }

  run(): string {
    let farthest: { bird: string, distance: number } = { bird: '', distance: -1 };

    Object.keys(this.events.byId).forEach(k => {
      const v: BirdEvent[] = this.events.byId[k];
      // Assuming that there is only 1 drop event. Should the simulation ever account 
      // multiple days - and thus possibly multiple drops, this will need to be modified.
      const dropEvent = v.find(e => e.type === EventType.Drop);
      // We only care about where rides end for the calculation.
      const farthestDistance = v.filter(e => e.type === EventType.EndRide)
        .reduce<number>((result, e) => {
          const distance = Helpers.distance(dropEvent, e);

          if (distance > result) {
            result = distance;
          }
          return result;
        }, 0);

      if (farthestDistance > farthest.distance) {
        farthest.bird = k;
        farthest.distance = farthestDistance;
      }
    });
    return `Bird furthest from its drop location: ${farthest.bird}, Distance: ${farthest.distance}.`;
  }
}