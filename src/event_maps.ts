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
}