import {Service} from "compose-as-code";

export class RedisService extends Service {
    constructor(scope, id) {
        super(scope, id, {
            image: "redis",
            pullPolicy: 'always',
            memReservation: "10M",
            memLimit:  "200M",
            cpus: "0.2",
            restart: "always"
        });
    }
}