import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { AverageSpeedCommand } from '../src/commands/average_speed';

describe('Average Speed Command', () => {
  it('should return "No bird rides." if there is no event data.', () => {
    const averageSpeedCommand = new AverageSpeedCommand(new EventMaps([]))
    const output = averageSpeedCommand.run();
    expect(output).to.equal('No bird rides.  No average speed calculated.');
  });

  it('should not calculate a bird with no end ride event.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')];

    const averageSpeedCommand = new AverageSpeedCommand(new EventMaps(events));
    const output = averageSpeedCommand.run();

    expect(output).to.equal('No bird rides.  No average speed calculated.');

  });

  it('should sort the bird events by timestamp', () => {
    const events = [
      new BirdEvent('3006,OPN1,END_RIDE,0,2,4204'),
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')
    ];

    const averageSpeedCommand = new AverageSpeedCommand(new EventMaps(events));
    const output = averageSpeedCommand.run();

    expect(output).to.equal('Average speed of all birds: 1 units/second.');
  });

  it('should compare multiple users on a single bird.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('350,OPN1,END_RIDE,0,90,4204'),
      new BirdEvent('466,OPN1,START_RIDE,0,90,3887'),
      new BirdEvent('511,OPN1,END_RIDE,0,0,3887')];

    const averageSpeedCommand = new AverageSpeedCommand(new EventMaps(events));
    const output = averageSpeedCommand.run();

    expect(output).to.equal('Average speed of all birds: 2 units/second.');
  });

  it('should compare multiple birds with multiple users and calculate the highest payer.', () => {
    const events = [
      new BirdEvent('302,OPN1,DROP,0,0,NULL'),
      new BirdEvent('305,OPN1,START_RIDE,0,0,4204'),
      new BirdEvent('350,OPN1,END_RIDE,0,90,4204'), // 2 units / sec
      new BirdEvent('460,G2I0,DROP,0,0,NULL'),
      new BirdEvent('466,G2I0,START_RIDE,0,0,3887'),
      new BirdEvent('556,G2I0,END_RIDE,0,90,3887'), // 1 unit / sec
      new BirdEvent('826,OPN1,START_RIDE,0,90,4204'),
      new BirdEvent('926,OPN1,END_RIDE,0,140,4204'), //.5 units / sec
      new BirdEvent('966,G2I0,START_RIDE,0,90,3887'),
      new BirdEvent('1146,G2I0,END_RIDE,0,270,3887')]; // 1 unit / sec

    const averageSpeedCommand = new AverageSpeedCommand(new EventMaps(events));
    const output = averageSpeedCommand.run();

    expect(output).to.equal('Average speed of all birds: 1.125 units/second.');
  });
});