export class BirdEvent {

  public timestamp: number;
  public birdId: string;
  public xCord: number;
  public yCord: number;
  public userId?: number;
  public type: EventType;

  constructor(eventString: string) {
    const tokens = eventString.split(',');

    if (tokens.length !== 6) {
      throw new Error(`Event String is improperly formed.  Expected 6 data fields.  Got: ${tokens.length}, 
        string: ${eventString}`);
    }

    this.timestamp = Number(tokens[0]);
    this.birdId = tokens[1];

    //have to switch because typescipt does not reverse map string enums
    switch (tokens[2]) {
      case EventType.Drop:
        this.type = EventType.Drop
        break;
      case EventType.EndRide:
        this.type = EventType.EndRide
        break;
      case EventType.StartRide:
        this.type = EventType.StartRide
        break;
      default:
        throw new Error(`Unexpected Event Type: ${tokens[2]} `);
    }

    this.xCord = Number(tokens[3]);
    this.yCord = Number(tokens[4]);
    this.userId = tokens[5] === 'NULL' ? null : Number(tokens[5]);
  }
}

export enum EventType {
  StartRide = 'START_RIDE',
  EndRide = 'END_RIDE',
  Drop = 'DROP'
}