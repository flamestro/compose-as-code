import {Composition, CompositionProps, App} from "compose-as-code";
import {RedisService} from "../services/redisService";


export class RedisComposition extends Composition {
    constructor(scope: App, id: string, props: CompositionProps) {
        super(scope, id, props);
        new RedisService(this, "RedisService")
    }
}