import { Command } from "./command";
import { BirdEvent, EventType } from "../event";
import { Helpers } from "../helpers";
import { EventMaps } from "../event_maps";

export class LongestBirdWaitTimeCommand implements Command {
  constructor(private events: EventMaps) {
  }

  run(): string {
    const longestWaitTimeBird: { bird: string, seconds: number } = { bird: '', seconds: -1 };

    Object.keys(this.events.byId).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = Helpers.sortByTimestamp(k, this.events.byId[k]);

      /// filter preserves order so we can filter to only the start rides.
      const waitTime = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.EndRide) {
          //ensure the next event is a StartRide
          if (v.length > i + 1 && v[i + 1].type === EventType.StartRide) {
            const delayBetweenRides = v[i + 1].timestamp - v[i].timestamp;
            result = delayBetweenRides > result ? delayBetweenRides : result;
          }
        }
        return result;
      }, -1);
      if (waitTime > longestWaitTimeBird.seconds) {
        longestWaitTimeBird.bird = k;
        longestWaitTimeBird.seconds = waitTime;
      }
    });

    return `Bird with the longest wait time: ${longestWaitTimeBird.bird}, Seconds: ${longestWaitTimeBird.seconds}.`;
  }
}