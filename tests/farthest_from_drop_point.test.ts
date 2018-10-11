import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { FarthestFromDropPointCommand } from '../src/commands/farthest_from_drop_point';

describe('Farthest From Drop Point Command', () => {
  it('should return "No Birds traveled." if there is no event data.', () => {
    const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps([]))
    const output = farthestFromDropPointCommand.run();
    expect(output).to.equal('No Birds traveled.  No farthest distance from drop point could be calculated.');
  });

  it('should not calculate a bird with no drop event.', () => {
    const events = [
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204'),
      new BirdEvent('3426,OPN1,END_RIDE,0,90,4204')];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();

      expect(output).to.equal('No Birds traveled.  No farthest distance from drop point could be calculated.');    
  });

  it('should not calculate a bird with no end ride event.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();

      expect(output).to.equal('No Birds traveled.  No farthest distance from drop point could be calculated.');
      
  });

  it('should sort the bird events by timestamp', () => {
    const events = [
      new BirdEvent('3426,OPN1,END_RIDE,0,90,4204'),
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')
      ];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();

      expect(output).to.equal('Bird farthest from its drop location: OPN1, Distance: 90.'); 
  });

  it('should calculate the distances between the Drop event and the end_ride event.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204'),
      new BirdEvent('3426,OPN1,END_RIDE,0,90,4204')];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();

      expect(output).to.equal('Bird farthest from its drop location: OPN1, Distance: 90.'); 
  });

  it('should only compare the drop event to the final end ride event.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('426,OPN1,END_RIDE,0,91.97004351346015,4204'),
      new BirdEvent('466,OPN1,START_RIDE,0,91.97004351346015,3887'),
      new BirdEvent('628,OPN1,END_RIDE,0,1,3887')];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();
      
      expect(output).to.equal('Bird farthest from its drop location: OPN1, Distance: 1.');
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
      new BirdEvent('926,OPN1,END_RIDE,0,-90.1,4204'),
      new BirdEvent('966,G2I0,START_RIDE,0,90,3887'),
      new BirdEvent('1628,G2I0,END_RIDE,0,-90,3887')];

      const farthestFromDropPointCommand = new FarthestFromDropPointCommand(new EventMaps(events));
      const output = farthestFromDropPointCommand.run();
      
      expect(output).to.equal('Bird farthest from its drop location: OPN1, Distance: 90.1.')
  });
});