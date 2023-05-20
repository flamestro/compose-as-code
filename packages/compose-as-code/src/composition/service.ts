import {Composition} from "./composition";
import {Network} from "./network";

export interface ServiceProps {
    image: string,
    pullPolicy?: "always" |  "if-not-present" | "never",
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no",
    expose?: string[],
    ports?: string[],
    cpus?: string,
    memReservation?: string,
    memLimit?: string,
    dependsOn?: Service[],
    environment?: {[key: string]: string | number | boolean },
    networks?: Network[]
}

export class Service {
    id;
    image: string;
    pullPolicy?: "always" |  "if-not-present" | "never";
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no";
    expose?: string[];
    ports?: string[];
    cpus?: string;
    memReservation?: string;
    memLimit?: string;
    dependsOn?: Service[];
    environment?: {[key: string]: string | number | boolean };
    networks?: Network[]
    constructor(scope: Composition, logicalId: string, props: ServiceProps) {
        this.id = `${scope.id}${logicalId}`
        this.image = props.image
        this.pullPolicy = props.pullPolicy ?? undefined
        this.restart = props.restart ?? undefined
        this.expose = props.expose ?? undefined
        this.ports = props.ports ?? undefined
        this.environment = props.environment ?? undefined
        this.cpus = props.cpus ?? undefined
        this.memReservation = props.memReservation ?? undefined
        this.memLimit = props.memLimit ?? undefined
        this.dependsOn = props.dependsOn ?? undefined
        this.networks = props.networks ?? undefined
        scope.services.push(this)
    }
}