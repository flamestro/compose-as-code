import {Composition} from "./composition";
import {Network} from "./network";
import {Volume} from "./volume";

export type ServiceVolume = {
    origin: string;
    destination: Volume | string;
    accessMode?: 'rw' | "ro" | 'z'
}

export type ServiceProps = {
    image: string,
    pullPolicy?: "always" |  "if-not-present" | "never",
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no",
    expose?: string[],
    ports?: string[],

    cpuCount?: string,
    cpuPercent?: string,
    cpuShares?: string,
    cpuPeriod?: string,
    cpuQuota?: string,
    cpuRtRuntime?: string,
    cpuRtPeriod?: string,
    cpuSet?: string,
    deviceReadBps?: { path: string, rate: number },
    deviceWriteBps?:  { path: string, rate: number },
    deviceReadIops?: { path: string, rate: number },
    deviceWriteIops?:  { path: string, rate: number },
    weight?: number,
    weightDevice?: { path: string, weight: number },
    capAdd?: string[],
    capDrop?: string[],
    cgroupParent?: string,
    deploy?: {
        mode?: "global" | "replicated",
        resources?: {
            limits?: {cpus?: string, memory?: string, pids?: number}
            reservations?: {cpus?: string, memory?: string}
        }
    };
    memReservation?: string,
    memLimit?: string,
    command?: string,
    containerName?: string,
    entryPoint?: string,
    dependsOn?: Service[],
    environment?: {[key: string]: string | number },
    networks?: Network[]
    volumes?: ServiceVolume[]
}

export class Service {
    id: string;
    image: string;
    pullPolicy?: "always" |  "if-not-present" | "never";
    restart?: "always" |  "on-failure" |  "unless-stopped" | "no";
    expose?: string[];
    ports?: string[];
    cpuCount?: string;
    cpuPercent?: string;
    cpuShares?: string;
    cpuPeriod?: string;
    cpuQuota?: string;
    cpuRtRuntime?: string;
    cpuRtPeriod?: string;
    cpuSet?: string;
    deviceReadBps?: { path: string; rate: number };
    deviceWriteBps?:  { path: string; rate: number };
    deviceReadIops?: { path: string; rate: number };
    deviceWriteIops?:  { path: string; rate: number };
    weight?: number;
    weightDevice?: { path: string; weight: number };
    capAdd?: string[];
    capDrop?: string[];
    cgroupParent?: string;
    deploy?: {
        mode?: "global" | "replicated",
        resources?: {
            limits?: {cpus?: string; memory?: string; pids?: number}
            reservations?: {cpus?: string; memory?: string}
        }
    };
    memReservation?: string;
    memLimit?: string;
    command?: string;
    containerName?: string;
    entryPoint?: string;
    dependsOn?: Service[];
    environment?: {[key: string]: string | number};
    networks?: Network[]
    volumes?: ServiceVolume[]

    constructor(scope: Composition, logicalId: string, props: ServiceProps) {
        this.id = `${scope.id}${logicalId}`
        this.image = props.image
        this.pullPolicy = props.pullPolicy;
        this.restart = props.restart;
        this.expose = props.expose;
        this.ports = props.ports;
        this.environment = props.environment;
        this.cpuCount = props.cpuCount;
        this.cpuPercent = props.cpuPercent;
        this.cpuShares = props.cpuShares;
        this.cpuPeriod = props.cpuPeriod;
        this.cpuQuota = props.cpuQuota;
        this.cpuRtRuntime = props.cpuRtRuntime;
        this.cpuPeriod = props.cpuPeriod;
        this.deviceReadBps = props.deviceReadBps
        this.deviceWriteBps = props.deviceWriteBps
        this.deviceReadIops = props.deviceReadIops
        this.deviceWriteIops = props.deviceWriteIops
        this.memReservation = props.memReservation;
        this.weight = props.weight;
        this.weightDevice = props.weightDevice;
        this.capAdd = props.capAdd;
        this.capDrop = props.capDrop;
        this.deploy = props.deploy;
        this.cgroupParent = props.cgroupParent;
        this.memLimit = props.memLimit;
        this.containerName = props.containerName;
        this.entryPoint = props.entryPoint;
        this.command = props.command;
        this.dependsOn = props.dependsOn;
        this.networks = props.networks;
        this.volumes = props.volumes;
        scope.services.push(this)
    }
}