import {Composition} from "./composition/composition";

interface Target {
    compositions: Composition[]
}

declare global {
    var target: Target;
}
globalThis.target = {
    compositions: []
}