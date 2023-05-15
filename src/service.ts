import {Composition} from "./composition";

export interface ServiceProps {
    image: string,
}

export class Service {
    image;
    id;
    constructor(scope: Composition, logicalId: string, props: ServiceProps) {
        this.id = `${scope.id}-${logicalId}`
        this.image = props.image
        scope.services.push(this)
    }
}