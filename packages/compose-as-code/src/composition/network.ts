import {Composition} from "./composition";

export type NetworkProps = {
}

export class Network {
    id;
    constructor(scope: Composition, logicalId: string, props: NetworkProps) {
        this.id = `${scope.id}${logicalId}`

        scope.networks.push(this)
    }
}