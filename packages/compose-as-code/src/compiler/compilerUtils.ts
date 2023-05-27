import fs from "fs";

const INDENTATION_CHARACTER = '  '

interface OutputConfig {
    fileName: string,
    outputDir: string,
    content: string,
}

export const createDirIfNotExisting = (dirname: string) => {
    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }
}

export const compileKeyValuePair = (key: string, value: string, indentationDepth: number) => {
    let result = '';
    result += indent(indentationDepth)
    result += `${key}: ${value ? `"${value}"` : ''}\n`
    return result
}

export const indent = (indentationDepth: number) => {
    let indentationResult = ''
    for(let i = 0; i< indentationDepth; i++) {
        indentationResult += INDENTATION_CHARACTER
    }
    return indentationResult
}

export const compileObject = (obj: object, baseIndentationDepth: number) => {
    let result = ''
    Object.keys(obj).forEach(
        (key) => {
            const value = obj[key]
            result += `${indent(baseIndentationDepth)}${key}: ${value}\n`
        }
    )
    return result
}

export const compileObjectListWithId = (list: {id: string }[], baseIndentationDepth: number) => {
    let result = ''
    list.forEach(entry => {
        result += indent(baseIndentationDepth)
        result += `- ${entry.id}\n`
    })
    return result
}

export const compileList = (list: string[], baseIndentationDepth: number) => {
    let result = ''
    list.forEach(entry => {
        result += indent(baseIndentationDepth)
        result += `- ${entry}\n`
    })
    return result
}

export const writeFile = (config: OutputConfig) => {
    createDirIfNotExisting(config.outputDir)
    const resultFileName = `${config.outputDir}/${config.fileName}.yaml`
    fs.writeFileSync(resultFileName, config.content);
}