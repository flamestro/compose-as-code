#!/usr/bin/env node

import fs from "fs";
import * as esbuild from 'esbuild'

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

esbuild.buildSync({
    entryPoints: [configuration.entrypoint],
    bundle: true,
    outfile: `${configuration.outputDir}/bundled.js`,
    target: 'node16',
    platform: 'node'
})

fs.readFile(`${configuration.outputDir}/bundled.js`, {encoding: 'utf-8'}, function(err, data){
    if (!err) {
        eval(data);

        compile({
            outputDir: configuration.outputDir
        })
    } else {
        console.log(err);
    }
});