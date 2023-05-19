import {Composition} from "./composition/composition";

export interface Target {
    compositions: Composition[]
}

declare global {
    var target: Target;
}

globalThis.target = {
    compositions: []
}