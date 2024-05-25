#!/usr/bin/env node

import fs from 'fs';
import * as esbuild from 'esbuild';

import { compile, listContainers } from './compiler/compositionCompiler';
import { loadConfiguration } from './configuration/configLoader';

const args = process.argv;

console.log('Loading Config 🗂️');
const configuration = loadConfiguration();

console.log('Bundling Composition ⚙️');
esbuild.buildSync({
  entryPoints: [configuration.entrypoint],
  bundle: true,
  outfile: `${configuration.outputDir}/bundled.js`,
  target: 'node18',
  platform: 'node',
});

console.log('Transpiling Composition 🧪');
fs.readFile(
  `${configuration.outputDir}/bundled.js`,
  { encoding: 'utf-8' },
  async function (err, data) {
    if (!err) {
      eval(data);

      console.log('Conducting Composition 🎻');
      await compile({
        outputDir: configuration.outputDir,
      });

      if (args.includes('ls')) {
        console.log(await listContainers());
      }
    } else {
      console.error(err);
    }
  }
);
