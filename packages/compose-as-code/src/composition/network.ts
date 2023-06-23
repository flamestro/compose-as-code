import {Composition} from "./composition";

export class Network {
    id;
    constructor(scope: Composition, logicalId: string) {
        this.id = `${scope.id}${logicalId}`

        scope.networks.push(this)
    }
}