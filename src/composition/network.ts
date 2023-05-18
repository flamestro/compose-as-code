import {Composition} from "./composition";

export interface NetworkProps {
}

export class Network {
    id;
    constructor(scope: Composition, logicalId: string, props: NetworkProps) {
        this.id = `${scope.id}-${logicalId}`

        scope.networks.push(this)
    }
}