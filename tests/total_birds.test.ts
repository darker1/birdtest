import { expect } from 'chai';
import 'mocha';
import { TotalBirdsCommand } from "../src/commands/total_birds";
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { equal } from 'assert';

describe('Total Birds Command', () => {
  it('should return 0 if there is no event data.', () => {
    const totalBirdsCommand = new TotalBirdsCommand(new EventMaps([]));
    const output = totalBirdsCommand.run();
    expect(output).to.equal('Total number of Birds dropped off in the simulation: 0.')
  });

  it('should only count drops.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,33.28280226855614,-87.88162047789511,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('426,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204')];

      const totalBirdsCommand = new TotalBirdsCommand(new EventMaps(events));
      const output = totalBirdsCommand.run();

      expect(output).to.equal('Total number of Birds dropped off in the simulation: 1.')
      
  });

  it('should count multiple birds being dropped.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,33.28280226855614,-87.88162047789511,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('426,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204'),
      new BirdEvent('419,G2I0,DROP,-28.367411419413685,23.567421582328606,NULL')];

      const totalBirdsCommand = new TotalBirdsCommand(new EventMaps(events));
      const output = totalBirdsCommand.run();
      
      expect(output).to.equal('Total number of Birds dropped off in the simulation: 2.')
  });
});