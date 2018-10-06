import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  const eventMaps = new EventMaps(events);
  console.log(`Total number of Birds dropped off in the simulation: ${eventMaps.totalBirdsDroppedOff()}`);
  const farthestFromStartLocation = eventMaps.birdFarthestFromDropPoint();
  console.log(`Bird furthest from its drop location: ${farthestFromStartLocation.bird}.  Distance: ${farthestFromStartLocation.distance}.`);
}

application();