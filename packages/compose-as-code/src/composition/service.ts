import {Composition} from "./composition";
import {Network} from "./network";
import {Volume} from "./volume";

interface ServiceCpuProps {
    cpuCount?: string,
    cpuPercent?: string,
    cpuShares?: string,
    cpuPeriod?: string,
    cpuQuota?: string,
    cpuRtRuntime?: string,
    cpuRtPeriod?: string,
    cpus?: string,
    cpuSet?: string,
}

export interface ServiceVolume {
    origin: string;
    destination: Volume | string;
    accessMode?: 'rw' | "ro" | 'z'
}

export interface ServiceProps {
    image: string,
    pullPolicy?: "always" |  "if-not-present" | "never",
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no",
    expose?: string[],
    ports?: string[],
    cpuProps?: ServiceCpuProps
    memReservation?: string,
    memLimit?: string,
    command?: string,
    containerName?: string,
    dependsOn?: Service[],
    environment?: {[key: string]: string | number | boolean },
    networks?: Network[]
    volumes?: ServiceVolume[]
}

export class Service {
    id;
    image: string;
    pullPolicy?: "always" |  "if-not-present" | "never";
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no";
    expose?: string[];
    ports?: string[];
    cpuProps?: ServiceCpuProps;
    memReservation?: string;
    memLimit?: string;
    command?: string;
    containerName?: string;
    dependsOn?: Service[];
    environment?: {[key: string]: string | number | boolean };
    networks?: Network[]
    volumes?: ServiceVolume[]
    constructor(scope: Composition, logicalId: string, props: ServiceProps) {
        this.id = `${scope.id}${logicalId}`
        this.image = props.image
        this.pullPolicy = props.pullPolicy ?? undefined
        this.restart = props.restart ?? undefined
        this.expose = props.expose ?? undefined
        this.ports = props.ports ?? undefined
        this.environment = props.environment ?? undefined
        this.cpuProps = props.cpuProps ?? undefined
        this.memReservation = props.memReservation ?? undefined
        this.memLimit = props.memLimit ?? undefined
        this.containerName = props.containerName ?? undefined
        this.command = props.command ?? undefined
        this.dependsOn = props.dependsOn ?? undefined
        this.networks = props.networks ?? undefined
        this.volumes = props.volumes ?? undefined
        scope.services.push(this)
    }
}