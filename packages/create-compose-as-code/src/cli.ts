#!/usr/bin/env node

import * as fs from 'fs';

import * as path from 'path';
const projectName = process.argv[2];

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir);

const templateDir = path.resolve(__dirname, 'template');
fs.copyFileSync(templateDir, projectDir);

fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));

projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);