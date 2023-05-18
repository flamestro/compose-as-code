#!/usr/bin/env node

import {Composition} from "./composition/composition";
import {compile} from "./compiler/compositionCompiler";

interface Target {
    compositions: Composition[]
}

export const target: Target = {
    compositions: []
}

console.log("Compiling Composition")
compile()