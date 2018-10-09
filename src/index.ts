import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";
import { TotalBirdsCommand } from "./commands/total_birds";
import { FarthestFromDropPointCommand } from "./commands/farthest_from_drop_point";
import { GreatestTotalDistanceCommand } from "./commands/greatest_total_distance";
import { HighestPayerCommand } from "./commands/highest_payer";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  const eventMaps = new EventMaps(events);
  const totalBirds = new TotalBirdsCommand(eventMaps);
  const farthestFromDrop = new FarthestFromDropPointCommand(eventMaps);
  const farthestFromStartLocation = eventMaps.birdFarthestFromDropPoint();
  const greatestTotalDistance = new GreatestTotalDistanceCommand(eventMaps);
  const highestPayer = new HighestPayerCommand(eventMaps);
  console.log(totalBirds.run());
  console.log(farthestFromDrop.run());
  console.log(greatestTotalDistance.run());
  console.log(highestPayer.run());
  const highestPayer1 = eventMaps.userPaidMost();
  const longestWait = eventMaps.longestWaitTimeBetweenRides();
  console.log(`Bird with the longest wait time: ${longestWait.bird}, Seconds: ${longestWait.seconds}`);
  const avgSpeed = eventMaps.averageSpeed();
  console.log(`Average speed of all birds: ${avgSpeed} units/second.`)
}

application();