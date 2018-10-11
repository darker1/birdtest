import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { HighestPayerCommand } from '../src/commands/highest_payer';

describe('Highest Payer Command', () => {
  it('should return "No Birds traveled." if there is no event data.', () => {
    const highestPayerCommand = new HighestPayerCommand
  (new EventMaps([]))
    const output = highestPayerCommand.run();
    expect(output).to.equal('No user rides. No highest payer calculated.');
  });

  it('should not calculate a bird with no end ride event.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')];

      const highestPayerCommand = new HighestPayerCommand
    (new EventMaps(events));
      const output = highestPayerCommand.run();

      expect(output).to.equal('No user rides. No highest payer calculated.');
      
  });

  it('should sort the bird events by timestamp', () => {
    const events = [
      new BirdEvent('3426,OPN1,END_RIDE,0,90,4204'),
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')
      ];

      const highestPayerCommand = new HighestPayerCommand
    (new EventMaps(events));
      const output = highestPayerCommand.run();

      expect(output).to.equal('User that paid the most: 4204, paid: $2.20.'); 
  });

  it('should compare multiple users on a single bird.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('426,OPN1,END_RIDE,0,91.97004351346015,4204'),
      new BirdEvent('466,OPN1,START_RIDE,0,91.97004351346015,3887'),
      new BirdEvent('628,OPN1,END_RIDE,0,1,3887')];

      const highestPayerCommand = new HighestPayerCommand
    (new EventMaps(events));
      const output = highestPayerCommand.run();
      
      expect(output).to.equal('User that paid the most: 3887, paid: $1.45.');
  });

  it('should compare multiple birds with multiple users and calculate the highest payer.', () => {
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

      const highestPayerCommand = new HighestPayerCommand
    (new EventMaps(events));
      const output = highestPayerCommand.run();
      
      expect(output).to.equal('User that paid the most: 3887, paid: $4.25.');
  });
});