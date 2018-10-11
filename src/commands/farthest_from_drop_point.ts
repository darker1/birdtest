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
      const v: BirdEvent[] = Helpers.sortByTimestamp(this.events.byId[k]);

      // Assuming that there is only 1 drop event. 
      // Understanding on this question is that "ends up" means the birds final resting
      // place for the day.  
      const dropEvent = v.find(e => e.type === EventType.Drop);
      // find the last stop_ride
      // this SHOULD always be the last element, but lets search anyway
      let index = v.length - 1;
      while (v[index] && v[index].type !== EventType.EndRide) {
        index--;
      } 

      if (index >= 0 && dropEvent) {
        const farthestDistance = Helpers.distance(dropEvent, v[index]);

        if (farthestDistance > farthest.distance) {
            farthest.bird = k;
            farthest.distance = farthestDistance;
          }
      }
    });

    if (farthest.distance === -1) {
      return 'No Birds traveled.  No farthest distance from drop point could be calculated.';
    }

    return `Bird farthest from its drop location: ${farthest.bird}, Distance: ${farthest.distance}.`;
  }
}