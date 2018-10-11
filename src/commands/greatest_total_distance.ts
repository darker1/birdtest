import { Command } from "./command";
import { BirdEvent, EventType } from "../event";
import { Helpers } from "../helpers";
import { EventMaps } from "../event_maps";

export class GreatestTotalDistanceCommand implements Command {
  constructor(private events: EventMaps) {
  }

  run(): string {
    let farthest: { bird: string, distance: number } = { bird: '', distance: -1 };

    Object.keys(this.events.byId).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = Helpers.sortByTimestamp(this.events.byId[k]);

      const totalDistance = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            result += Helpers.distance(b, v[i + 1]);
          }
        }
        return result;
      }, 0);

      if (totalDistance > farthest.distance) {
        farthest.bird = k;
        farthest.distance = totalDistance;
      }
    });

    if (farthest.distance === -1) {
      return 'No Birds traveled.  No longest total distance could be calculated.';
    }

    return `Bird that traveled the greatest total distance: ${farthest.bird}, Distance: ${farthest.distance}.`;
  }
}