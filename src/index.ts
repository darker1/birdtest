import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";
import { TotalBirdsCommand } from "./commands/total_birds";
import { FarthestFromDropPointCommand } from "./commands/farthest_from_drop_point";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  const eventMaps = new EventMaps(events);
  const totalBirds = new TotalBirdsCommand(eventMaps);
  const farthestFromDrop = new FarthestFromDropPointCommand(eventMaps);
  const farthestFromStartLocation = eventMaps.birdFarthestFromDropPoint();
  
  console.log(totalBirds.run());
  console.log(farthestFromDrop.run());
  const greatestTotalDistance = eventMaps.birdTotalGreatestDistance();
  console.log(`Bird that traveled the greatest total distance: ${greatestTotalDistance.bird}, Distance: ${greatestTotalDistance.distance}.`);
  const highestPayer = eventMaps.userPaidMost();
  console.log(`User that paid the most: ${highestPayer.userId}, paid: ${highestPayer.paid}.`);
  const longestWait = eventMaps.longestWaitTimeBetweenRides();
  console.log(`Bird with the longest wait time: ${longestWait.bird}, Seconds: ${longestWait.seconds}`);
  const avgSpeed = eventMaps.averageSpeed();
  console.log(`Average speed of all birds: ${avgSpeed} units/second.`)
}

application();