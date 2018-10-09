import { BirdEvent, EventType } from "./event";

export class EventMaps {
  public byType: Map<EventType, Array<BirdEvent>> = new Map<EventType, Array<BirdEvent>>();
  public byId: Map<string, Array<BirdEvent>> = new Map<string, Array<BirdEvent>>();
  public byUser: Map<string, Array<BirdEvent>> = new Map<string, Array<BirdEvent>>();

  constructor(private events: Array<BirdEvent>) {
    // initialize the map so we dont have to check at 
    // every iteration. 
    Object.keys(EventType).forEach(k => this.byType[EventType[k]] = new Array<BirdEvent>());

    events.forEach(e => {
      this.byType[e.type].push(e);

      if (!this.byId[e.birdId]) {
        this.byId[e.birdId] = new Array<BirdEvent>();
      }
      this.byId[e.birdId].push(e);

      if (e.userId) { // need to avoid the null users
        if (!this.byUser[e.userId]) {
          this.byUser[e.userId] = new Array<BirdEvent>();
        }
        this.byUser[e.userId].push(e);
      }
    });
  }

  public birdFarthestFromDropPoint(): { bird: string, distance: number } {
    let farthest: { bird: string, distance: number } = { bird: '', distance: -1 };

    Object.keys(this.byId).forEach(k => {
      const v: BirdEvent[] = this.byId[k];
      // Assuming that there is only 1 drop event. Should the simulation ever account 
      // multiple days - and thus possibly multiple drops, this will need to be modified.
      const dropEvent = v.find(e => e.type === EventType.Drop);
      // We only care about where rides end for the calculation.
      const farthestDistance = v.filter(e => e.type === EventType.EndRide)
        .reduce<number>((result, e) => {
          const distance = this.distance(dropEvent, e);

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
    return farthest;
  }

  public birdTotalGreatestDistance(): { bird: string, distance: number } {
    let farthest: { bird: string, distance: number } = { bird: '', distance: -1 };

    Object.keys(this.byId).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = this.sortByTimestamp(k, this.byId[k]);

      const totalDistance = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            result += this.distance(b, v[i + 1]);
          }
        }
        return result;
      }, 0);

      if (totalDistance > farthest.distance) {
        farthest.bird = k;
        farthest.distance = totalDistance;
      }
    });
    return farthest;
  }

  public userPaidMost(): { userId: string, paid: string } {
    let highestPayer: { userId: string, paid: number } = { userId: '', paid: -1 };

    Object.keys(this.byUser).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = this.sortByTimestamp(k, this.byUser[k]);

      const totalPaid = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            result += this.calculateCost(b, v[i + 1]);
          }
        }
        return result;
      }, 0);

      if (totalPaid > highestPayer.paid) {
        highestPayer.userId = k;
        highestPayer.paid = totalPaid;
      }
    });
    return { userId: highestPayer.userId, paid: `$${highestPayer.paid.toFixed(2)}` };
  }

  public longestWaitTimeBetweenRides(): { bird: string, seconds: number } {
    const longestWaitTimeBird: { bird: string, seconds: number } = { bird: '', seconds: -1 };

    Object.keys(this.byId).forEach(k => {
      //ensure that the events are in order
      const v: BirdEvent[] = this.sortByTimestamp(k, this.byId[k]);

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
    return longestWaitTimeBird;
  }

  public averageSpeed(): number {
    let totalRides = 0;
    const sumSpeed = Object.keys(this.byId).reduce((resultSpeed, k) => {
      //ensure that the events are in order
      const v: BirdEvent[] = this.sortByTimestamp(k, this.byId[k]);

      const totalSpeed = v.reduce<number>((result, b, i) => {
        if (b.type === EventType.StartRide) {
          //ensure the next event is a EndRide
          if (v.length > i + 1 && v[i + 1].type === EventType.EndRide) {
            // calculate speed as units distance over seconds
            const time = (v[i+1].timestamp - b.timestamp);
            const distance = this.distance(b, v[i + 1])

            result += distance / time;

            totalRides += 1;
          }
        }
        return result;
      }, 0);

      return resultSpeed + totalSpeed;
    }, 0);

    return sumSpeed / totalRides;
  }


  private sortByTimestamp(k: string, arr: BirdEvent[]): BirdEvent[] {
    return arr.sort((b1, b2) => b1.timestamp === b2.timestamp ? 0 : b1.timestamp > b2.timestamp ? 1 : -1);
  }

  private distance(start: BirdEvent, stop: BirdEvent): number {
    return Math.sqrt(Math.pow(stop.xCord - start.xCord, 2) + Math.pow(stop.yCord - start.yCord, 2));
  }

  private calculateCost(start: BirdEvent, stop: BirdEvent): number {
    let totalSeconds: number = stop.timestamp - start.timestamp - 60;

    if (totalSeconds < 0) {
      return 0;
    }

    return 1.15 + (.15 * Math.ceil(totalSeconds / 60));
  }
}