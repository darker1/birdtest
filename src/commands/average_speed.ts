import { Command } from "./command";
import { BirdEvent, EventType } from "../event";
import { Helpers } from "../helpers";
import { EventMaps } from "../event_maps";

export class AverageSpeedCommand implements Command {
  constructor(private events: EventMaps) {
  }

  run(): string {
    let totalRides = 0;
    const sumSpeed = Object.keys(this.events.byId).reduce((resultSpeed, k) => {
      //ensure that the events are in order
      const v: BirdEvent[] = Helpers.sortByTimestamp(k, this.events.byId[k]);

      const totalSpeed = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            // calculate speed as units distance over seconds
            const time = (v[i+1].timestamp - b.timestamp);
            const distance = Helpers.distance(b, v[i + 1])

            result += distance / time;

            totalRides += 1;
          }
        }
        return result;
      }, 0);

      return resultSpeed + totalSpeed;
    }, 0);

    const avgSpeed = sumSpeed / totalRides;
    
    return `Average speed of all birds: ${avgSpeed} units/second.`;
  }
}