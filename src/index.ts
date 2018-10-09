import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";
import { TotalBirdsCommand } from "./commands/total_birds";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  const eventMaps = new EventMaps(events);
  const totalBirds = new TotalBirdsCommand(eventMaps);

  console.log(totalBirds.run());
  const farthestFromStartLocation = eventMaps.birdFarthestFromDropPoint();
  console.log(`Bird furthest from its drop location: ${farthestFromStartLocation.bird}.  Distance: ${farthestFromStartLocation.distance}.`);
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