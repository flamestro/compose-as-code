import {Service} from "./service";
import {Network} from "./network";
import {Target} from "../target";

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

    constructor(id: string, props: CompositionProps) {
        this.version = props.version
        this.name = props.name
        this.id = id;
        (globalThis.target as Target).compositions.push(this);
    }
}
