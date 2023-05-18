import {Composition} from "./composition";

export interface ServiceProps {
    image: string,
    pullPolicy?: "always" |  "if-not-present" | "never"
    expose?: string[]
    environment?: {[key: string]: string | number | boolean }
}

export class Service {
    image;
    id;
    pullPolicy;
    expose;
    environment;
    constructor(scope: Composition, logicalId: string, props: ServiceProps) {
        this.id = `${scope.id}-${logicalId}`
        this.image = props.image
        this.pullPolicy = props.pullPolicy ?? undefined
        this.expose = props.expose ?? undefined
        this.environment = props.environment ?? undefined
        scope.services.push(this)
    }
}