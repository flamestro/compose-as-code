import {Service} from "./service";
import {target} from "../index";

export interface CompositionProps {
    name: string,
    version: "3.8"
}

export class Composition {
    version: "3.8";
    name: string;
    id: string;
    services: Service[] = []

    constructor(id, props: CompositionProps) {
        this.version = props.version
        this.name = props.name
        this.id = id;
        target.compositions.push(this);
    }
}