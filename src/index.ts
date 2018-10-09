import { EventParser } from "./event_parser";
import { EventMaps } from "./event_maps";
import { TotalBirdsCommand } from "./commands/total_birds";
import { FarthestFromDropPointCommand } from "./commands/farthest_from_drop_point";
import { GreatestTotalDistanceCommand } from "./commands/greatest_total_distance";
import { HighestPayerCommand } from "./commands/highest_payer";
import { LongestBirdWaitTimeCommand } from "./commands/longest_bird_wait_time";
import { AverageSpeedCommand } from "./commands/average_speed";
import { Command } from "./commands/command";

const application = async () => {
  const events = await EventParser.parseFile('events.txt');
  
  const eventMaps = new EventMaps(events);
  const commands = [
    new TotalBirdsCommand(eventMaps),
    new FarthestFromDropPointCommand(eventMaps),
    new GreatestTotalDistanceCommand(eventMaps),
    new HighestPayerCommand(eventMaps),
    new LongestBirdWaitTimeCommand(eventMaps),
    new AverageSpeedCommand(eventMaps)
  ];

  console.log('****************************');
  console.log('*  Bird Test by Kyle Wall  *')
  console.log('****************************');

  commands.forEach(c => console.log(c.run()));
}

application();