import {Composition, Network, Service, Volume} from "compose-as-code";

interface Props {
    volume: Volume,
    network: Network
}
export class RedisService extends Service {
    constructor(scope: Composition, id: string, props: Props) {
        super(scope, id, {
            image: "redis",
            pullPolicy: 'always',
            memReservation: "10M",
            memLimit:  "200M",
            deploy: {
                resources: {
                    limits: {
                        cpus: "0.2"
                    },
                    reservations: {
                        cpus: "0.01"
                    }
                }
            },
            restart: "always",
            volumes: [
                {origin: "/example", destination: props.volume}
            ],
            networks: [props.network]
        });
    }
}