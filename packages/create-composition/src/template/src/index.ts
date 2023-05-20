import {App} from "compose-as-code";
import {RedisService} from "./services/redisService";

const app = new App("MyApp")

new RedisService(app, "MyRedisService")
