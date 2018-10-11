import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { GreatestTotalDistanceCommand } from '../src/commands/greatest_total_distance';

describe('Greatest Total Distance Command', () => {
  it('should return "No Birds traveled." if there is no event data.', () => {
    const greatestTotalDistanceCommand = new GreatestTotalDistanceCommand(new EventMaps([]))
    const output = greatestTotalDistanceCommand.run();
    expect(output).to.equal('No Birds traveled.  No longest total distance could be calculated.');
  });

  it('should calculate the distances between the start_ride events and the end_ride events.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204'),
      new BirdEvent('3426,OPN1,END_RIDE,0,90,4204')];

      const greatestTotalDistanceCommand = new GreatestTotalDistanceCommand(new EventMaps(events));
      const output = greatestTotalDistanceCommand.run();

      expect(output).to.equal('Bird that traveled the greatest total distance: OPN1, Distance: 89.');
      
  });

  it('should compare multiple birds to determine which traveled the greatest total distance.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('426,OPN1,END_RIDE,0,91.97004351346015,4204'),
      new BirdEvent('419,G2I0,DROP,1,1,NULL'),
      new BirdEvent('466,G2I0,START_RIDE,1,1,3887'),
      new BirdEvent('628,G2I0,END_RIDE,1,91.97004351346015,3887')];

      const greatestTotalDistanceCommand = new GreatestTotalDistanceCommand(new EventMaps(events));
      const output = greatestTotalDistanceCommand.run();
      
      expect(output).to.equal('Bird that traveled the greatest total distance: OPN1, Distance: 91.97004351346015.');
  });

  it('should compare multiple birds with multiple rides and calculate the greatest total distance traveled.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('426,OPN1,END_RIDE,0,91,4204'),
      new BirdEvent('419,G2I0,DROP,0,0,NULL'),
      new BirdEvent('466,G2I0,START_RIDE,0,0,3887'),
      new BirdEvent('628,G2I0,END_RIDE,0,90,3887'),
      new BirdEvent('826,OPN1,START_RIDE,0,91,4204'),
      new BirdEvent('926,OPN1,END_RIDE,0,-90,4204'),
      new BirdEvent('966,G2I0,START_RIDE,0,90,3887'),
      new BirdEvent('1628,G2I0,END_RIDE,0,-90,3887')];
      
      const greatestTotalDistanceCommand = new GreatestTotalDistanceCommand(new EventMaps(events));
      const output = greatestTotalDistanceCommand.run();
      
      expect(output).to.equal('Bird that traveled the greatest total distance: OPN1, Distance: 272.')
  });
});