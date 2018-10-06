import * as fs from 'fs';
import { promisify } from 'util';
import {BirdEvent} from './event';

export class EventParser {
  static async parseFile(file: string): Promise<Array<BirdEvent>> {
    const readFile = promisify(fs.readFile);
    const events = await readFile(file, { encoding: 'utf8' });
  
    return events.split('\n').reduce((result, e) => { 
      if(e.trim() !== '')
        result.push(new BirdEvent(e));
      return result;
    }, new Array<BirdEvent>());
  }
}

