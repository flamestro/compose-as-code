import {Composition} from "./composition";

export type VolumeProps = {
}

export class Volume {
    id;
    constructor(scope: Composition, logicalId: string, props: VolumeProps) {
        this.id = `${scope.id}${logicalId}`

        scope.volumes.push(this)
    }
}