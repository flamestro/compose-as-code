#!/usr/bin/env node

const fs =  require('fs');
const path =  require('path');

const projectName = process.argv[2];

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
const templateDir = path.resolve(__dirname, 'template');

console.log(`Loading default template`)

function createDir(at) {
    fs.mkdirSync(at);
}

function rename(from, to) {
    fs.renameSync(
        path.join(projectDir, from),
        path.join(projectDir, to)
    );
}

function copy(from, to) {
    fs.cpSync(from, to, { recursive: true });
}

function removeFromProject(fileName) {
    fs.rmSync(
        path.join(projectDir, fileName),
    );
}

createDir(projectDir)
copy(templateDir, projectDir)
rename("gitignore", ".gitignore")
removeFromProject("yarn.lock")


const projectPackageJson = require(path.join(projectDir, 'package.json'));

projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

console.log(`${projectName} was initialized successfully!`);
console.log(`Location: ${projectDir}`);