import { Command } from "./command";
import { BirdEvent, EventType } from "../event";
import { Helpers } from "../helpers";
import { EventMaps } from "../event_maps";

export class HighestPayerCommand implements Command {
  constructor(private events: EventMaps) {
  }

  run(): string {
    let highestPayer: { userId: string, paid: number } = { userId: '', paid: -1 };

    Object.keys(this.events.byUser).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = Helpers.sortByTimestamp(this.events.byUser[k]);

      const totalPaid = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            result += Helpers.calculateCost(b, v[i + 1]);
          }
        }
        return result;
      }, 0);

      if (totalPaid > 0 && totalPaid > highestPayer.paid) {
        highestPayer.userId = k;
        highestPayer.paid = totalPaid;
      }
    }); 

    if (highestPayer.paid === -1) {
      return 'No user rides. No highest payer calculated.';
    }

    return `User that paid the most: ${highestPayer.userId}, paid: $${highestPayer.paid.toFixed(2)}.`;
  }
}