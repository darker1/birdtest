import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import {LongestBirdWaitTimeCommand} from '../src/commands/longest_bird_wait_time';

describe('Longest Bird Wait Time Command', () => {
  it('should return "No Birds waited between rides" if there is no event data.', () => {
    const longestBirdWaitTimeCommand = new LongestBirdWaitTimeCommand(new EventMaps([]))
    const output = longestBirdWaitTimeCommand.run();
    expect(output).to.equal('No Birds waited between rides. Longest wait time cannot be calculated.');
  });

  it('should only count time between two rides.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,33.28280226855614,-87.88162047789511,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('3426,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204'),
      new BirdEvent('3505,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('4260,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204')];

      const longestBirdWaitTimeCommand = new LongestBirdWaitTimeCommand(new EventMaps(events));
      const output = longestBirdWaitTimeCommand.run();

      expect(output).to.equal('Bird with the longest wait time: OPN1, Seconds: 79.')
      
  });

  it('should report that no birds waited between rides if no bird was ridden twice.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,33.28280226855614,-87.88162047789511,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('426,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204'),
      new BirdEvent('419,G2I0,DROP,-28.367411419413685,23.567421582328606,NULL'),
      new BirdEvent('466,G2I0,START_RIDE,-28.367411419413685,23.567421582328606,3887'),
      new BirdEvent('628,G2I0,END_RIDE,17.525578899958006,-27.476564006725383,3887')];

      const longestBirdWaitTimeCommand = new LongestBirdWaitTimeCommand(new EventMaps(events));
      const output = longestBirdWaitTimeCommand.run();
      
      expect(output).to.equal('No Birds waited between rides. Longest wait time cannot be calculated.')
  });

  it('should compare multiple bird rides and calculate the bird with the longest wait time.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,33.28280226855614,-87.88162047789511,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('426,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204'),
      new BirdEvent('419,G2I0,DROP,-28.367411419413685,23.567421582328606,NULL'),
      new BirdEvent('466,G2I0,START_RIDE,-28.367411419413685,23.567421582328606,3887'),
      new BirdEvent('628,G2I0,END_RIDE,17.525578899958006,-27.476564006725383,3887'),
      new BirdEvent('826,OPN1,START_RIDE,33.28280226855614,-87.88162047789511,4204'),
      new BirdEvent('926,OPN1,END_RIDE,7.563016232237587,91.97004351346015,4204'),
      new BirdEvent('966,G2I0,START_RIDE,-28.367411419413685,23.567421582328606,3887'),
      new BirdEvent('1628,G2I0,END_RIDE,17.525578899958006,-27.476564006725383,3887')];

      const longestBirdWaitTimeCommand = new LongestBirdWaitTimeCommand(new EventMaps(events));
      const output = longestBirdWaitTimeCommand.run();
      
      expect(output).to.equal('Bird with the longest wait time: OPN1, Seconds: 400.')
  });
});