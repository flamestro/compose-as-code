#!/usr/bin/env node

import fs from "fs";
import * as esbuild from 'esbuild'

import {compile} from "./compiler/compositionCompiler";
import {loadConfiguration} from "./configuration/configLoader";


console.log("Loading Config 🗂️")
const configuration = loadConfiguration()


console.log("Bundling Composition ⚙️")
esbuild.buildSync({
    entryPoints: [configuration.entrypoint],
    bundle: true,
    outfile: `${configuration.outputDir}/bundled.js`,
    target: 'node16',
    platform: 'node',
})

console.log("Transpiling Composition 🧪")
fs.readFile(`${configuration.outputDir}/bundled.js`, {encoding: 'utf-8'}, async function (err, data) {
    if (!err) {
        eval(data);

        console.log("Conducting Composition 🎻")
        await compile({
            outputDir: configuration.outputDir,
        })
    } else {
        console.error(err);
    }
});