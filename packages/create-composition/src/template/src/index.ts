import { App } from 'compose-as-code';
import { RedisComposition } from './compositions/redisComposition';

const app = new App('MyApp');

new RedisComposition(app, 'RedisComposition', {
  version: '3.8',
  name: 'RedisComposition',
});
