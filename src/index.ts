import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";
import { TotalBirdsCommand } from "./commands/total_birds";
import { FarthestFromDropPointCommand } from "./commands/farthest_from_drop_point";
import { GreatestTotalDistanceCommand } from "./commands/greatest_total_distance";
import { HighestPayerCommand } from "./commands/highest_payer";
import { LongestBirdWaitTimeCommand } from "./commands/longest_bird_wait_time";
import { AverageSpeedCommand } from "./commands/average_speed";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  const eventMaps = new EventMaps(events);
  const totalBirds = new TotalBirdsCommand(eventMaps);
  const farthestFromDrop = new FarthestFromDropPointCommand(eventMaps);
  const farthestFromStartLocation = eventMaps.birdFarthestFromDropPoint();
  const greatestTotalDistance = new GreatestTotalDistanceCommand(eventMaps);
  const highestPayer = new HighestPayerCommand(eventMaps);
  const longestWaitTime = new LongestBirdWaitTimeCommand(eventMaps);
  const averageSpeed = new AverageSpeedCommand(eventMaps);
  console.log(totalBirds.run());
  console.log(farthestFromDrop.run());
  console.log(greatestTotalDistance.run());
  console.log(highestPayer.run());
  console.log(longestWaitTime.run());
  console.log(averageSpeed.run());
}

application();