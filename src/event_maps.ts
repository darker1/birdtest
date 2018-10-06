import { BirdEvent, EventType } from "./event";

export class EventMaps {
  private byType: Map<EventType, Array<BirdEvent>> = new Map<EventType, Array<BirdEvent>>();
  private byId: Map<string, Array<BirdEvent>> = new Map<string, Array<BirdEvent>>();
  constructor(events: Array<BirdEvent>) {
    // initialize the map so we dont have to check at 
    // every iteration. 
    Object.keys(EventType).forEach(k => this.byType[EventType[k]] = new Array<BirdEvent>());
    
    events.forEach(e => {
      this.byType[e.type].push(e);
      if(!this.byId[e.birdId]) {
        this.byId[e.birdId] = new Array<BirdEvent>();
      }
      this.byId[e.birdId].push(e);
    });
  }

  public totalBirdsDroppedOff() {
    return this.byType[EventType.Drop].length;
  }

  public birdFarthestFromDropPoint(): {bird: string, distance: Number}  {
    let furthest: {bird: string, distance: Number} = {bird: '', distance: -1};
    
    Object.keys(this.byId).forEach( k => {
      const v: BirdEvent[] = this.byId[k];
      // Assuming that there is only 1 drop event. Should the simulation ever account 
      // multiple days - and thus possibly multiple drops, this will need to be modified.
      const dropEvent = v.find(e => e.type === EventType.Drop);
      // We only care about where rides end for the calculation.
      const furthestDistance = v.filter(e => e.type === EventType.EndRide)
       .reduce<Number>((result, e) => {
        const distance = this.distance(dropEvent, e);
        
        if(distance > result) {
          result = distance;
        }
        return result;
      }, 0);
      
      if(furthestDistance > furthest.distance) {
        furthest.bird = k;
        furthest.distance = furthestDistance;
      }
    });
    return furthest;
  }

  private distance(start: BirdEvent, stop: BirdEvent): number {
    return Math.sqrt(Math.pow(stop.xCord - start.xCord, 2)-Math.pow(stop.yCord - start.yCord, 2));
  }
}