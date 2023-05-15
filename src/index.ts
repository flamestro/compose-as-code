import {Composition} from "./composition";
import * as fs from 'fs'

interface Target {
    compositions: Composition[]
}

export const target: Target = {
    compositions: []
}

const createDirIfNotExisting = (dirname: string) => {
    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }
}

const compileCompositionMetaData = (composition: Composition) => {
    return `version: "${composition.version}"\nname: ${composition.name}`
}

const compileServices = (composition: Composition) => {
    return `services:\n${composition.services.map(
        service => `\t${service.id}:\n\t\timage: "${service.image}"\n`
    ).join('')}`
}

export const compile = () => {
    target.compositions.forEach(
        composition => {
            let resultFileContent = ''
            resultFileContent += compileCompositionMetaData(composition)
            resultFileContent += "\n"
            resultFileContent += compileServices(composition)
            createDirIfNotExisting('./out')
            fs.writeFile(`./out/${composition.id}.yaml`, resultFileContent, err => {
                if (err) {
                    console.error(err);
                }
            });
        }
    )
}
