#!/usr/bin/env node

import * as ts from "typescript";
import {ModuleKind, ModuleResolutionKind, ScriptTarget} from "typescript";
import fs from "fs";

import {Composition} from "./composition/composition";
import {compile} from "./compiler/compositionCompiler";
import {loadConfiguration} from "./configuration/configLoader";

interface Target {
    compositions: Composition[]
}

export const target: Target = {
    compositions: []
}

console.log("Loading cac configuration")
const configuration = loadConfiguration()

console.log("Compiling Composition")
fs.readFile(configuration.entrypoint, {encoding: 'utf-8'}, function(err, data){
    if (!err) {
        const result = ts.transpile(data, {
            target: ScriptTarget.ES2017,
            esModuleInterop: true,
            module: ModuleKind.CommonJS,
            allowJs: true,
            moduleResolution: ModuleResolutionKind.Node16
        });

        eval(result);

        compile({
            outputDir: configuration.outputDir
        })
    } else {
        console.log(err);
    }
});