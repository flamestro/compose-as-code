import {
  Composition,
  CompositionProps,
  App,
  Volume,
  Network,
} from 'compose-as-code';
import { RedisService } from '../services/redisService';

export class RedisComposition extends Composition {
  constructor(scope: App, id: string, props: CompositionProps) {
    super(scope, id, props);
    const volume = new Volume(this, 'Volume', {});
    const network = new Network(this, 'Network');
    new RedisService(this, 'RedisService', { volume, network });
  }
}
