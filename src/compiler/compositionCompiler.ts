import fs from "fs";
import {Composition} from "../composition/composition";
import {target} from "../index";

const INDENTATION_CHARACTER = '  '

interface OutputConfig {
    fileName: string,
    outputDir: string,
    content: string,
}

interface CompilerProps {
    outputDir?: string,
}

const createDirIfNotExisting = (dirname: string) => {
    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }
}

const compileKeyValuePair = (key: string, value: string, indentationDepth: number) => {
    return `${indent(indentationDepth)}${key}: ${value ? `"${value}"` : ''}\n`
}

const compileCompositionMetaData = (composition: Composition) => {
    let result = ''
    result += compileKeyValuePair('version', composition.version, 0)
    result += compileKeyValuePair('name', composition.name.toLowerCase(), 0)
    return result
}

const indent = (indentationDepth: number) => {
    let indentationResult = ''
    for(let i = 0; i< indentationDepth; i++) {
        indentationResult += INDENTATION_CHARACTER
    }
    return indentationResult
}

const compileList = (list: string[], baseIndentationDepth: number) => {
    let result = ''
    list.forEach(entry => {
        result += indent(baseIndentationDepth)
        result += `- ${entry}\n`
    })
    return result
}

const compileServices = (composition: Composition) => {
    let serviceTextBlock = compileKeyValuePair('services', '', 0);
    composition.services.forEach(service => {
        serviceTextBlock += compileKeyValuePair(service.id, '', 1);
        serviceTextBlock += compileKeyValuePair('image', service.image, 2);
        if(service.pullPolicy){
            serviceTextBlock += compileKeyValuePair('pull_policy', service.pullPolicy, 2);
        }
        if(service.expose){
            serviceTextBlock += compileKeyValuePair('expose', '', 2);
            serviceTextBlock += compileList(service.expose, 3)
        }
    })
    return serviceTextBlock
}

const writeFile = (config: OutputConfig) => {
    createDirIfNotExisting(config.outputDir)
    const resultFileName = `${config.outputDir}/${config.fileName}.yaml`
    console.log(`writing file ${resultFileName}`)
    fs.writeFile(resultFileName, config.content, err => {
        if (err) {
            console.error(err);
        }
    });
}

export const compile = (compilerProps?: CompilerProps) => {
    target.compositions.forEach(
        composition => {
            let resultFileContent = ''
            resultFileContent += compileCompositionMetaData(composition)
            resultFileContent += compileServices(composition)
            writeFile({
                fileName: composition.id,
                outputDir: compilerProps.outputDir ?? './out',
                content: resultFileContent
            })

        }
    )
}
