import { expect } from 'chai';
import 'mocha';
import { EventMaps } from "../src/event_maps";
import { BirdEvent } from '../src/event';
import { Helpers } from '../src/helpers';

describe('Helpers', () => {
  describe('sortByTimestamp', () => {
    it('should sort by timestamp.', () => {
      const output = Helpers.sortByTimestamp([      
        new BirdEvent('4005,OPN1,END_RIDE,0,0,4204'),
        new BirdEvent('3005,OPN1,START_RIDE,0,1,4204')
      ]);

      expect(output[0].timestamp).to.equal(3005);
      expect(output[1].timestamp).to.equal(4005);
    });
  });

  describe('distance', () => {
    it('should calculate the distance formula - x focused', () => {
      const output = Helpers.distance(      
        new BirdEvent('2005,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('3005,OPN1,END_RIDE,10,0,4204')
      );

      expect(output).to.equal(10);
    });
    it('should calculate the distance formula - y focused', () => {
      const output = Helpers.distance(      
        new BirdEvent('2005,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('3005,OPN1,END_RIDE,0,10,4204')
      );

      expect(output).to.equal(10);
    });
    it('should calculate the distance formula', () => {
      const output = Helpers.distance(      
        new BirdEvent('2005,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('3005,OPN1,END_RIDE,3,4,4204')
      );

      expect(output).to.equal(5);
    });
  });

  describe('calculateCost', () => {
    it('should calculate the cost of less than 60 seconds at 0.', () => {
      const output = Helpers.calculateCost(      
        new BirdEvent('0,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('59,OPN1,END_RIDE,10,0,4204')
      );

      expect(output).to.equal(0);
    });
    it('should calculate the cost of 60 seconds at 1.15', () => {
      const output = Helpers.calculateCost(      
        new BirdEvent('0,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('60,OPN1,END_RIDE,0,10,4204')
      );

      expect(output).to.equal(1.15);
    });
    it('should calculate the cost of 61 seconds at 1.15 + .15/ minute extra', () => {
      const output = Helpers.calculateCost(      
        new BirdEvent('0,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('61,OPN1,END_RIDE,3,4,4204')
      );

      expect(output).to.equal(1.3);
    });

    it('should calculate the cost of 121 seconds at 1.15 + 2 * .15/ minute extra', () => {
      const output = Helpers.calculateCost(      
        new BirdEvent('0,OPN1,START_RIDE,0,0,4204'),
        new BirdEvent('121,OPN1,END_RIDE,3,4,4204')
      );

      expect(output).to.equal(1.45);
    });
  });
});
