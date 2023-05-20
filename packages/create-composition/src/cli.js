#!/usr/bin/env node

const fs =  require('fs');
const path =  require('path');

const projectName = process.argv[2];

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir);

const templateDir = path.resolve(__dirname, 'template');
console.log(`HERE: ${templateDir}`)
fs.cpSync(templateDir, projectDir, { recursive: true });
fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
);

fs.renameSync(
    path.join(projectDir, 'cac.config.template.json'),
    path.join(projectDir, 'cac.config.json')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));

projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);