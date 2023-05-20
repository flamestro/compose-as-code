import {Service} from "./service";
import {Network} from "./network";
import {App} from "./app";

export interface CompositionProps {
    name: string,
    version: "3.8"
}

export class Composition {
    version: "3.8";
    name: string;
    id: string;
    services: Service[] = []
    networks: Network[] = []

    constructor(scope: App, logicalId: string, props: CompositionProps) {
        this.version = props.version
        this.name = props.name
        this.id = scope.id + logicalId;
        scope.register(this);
    }
}
