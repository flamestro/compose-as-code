import fs from 'fs';

const INDENTATION_CHARACTER = '  ';

export interface OutputFile {
    fileName: string;
    outputDir: string;
    content: string;
}

export const createDirIfNotExisting = (dirname: string) => {
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
};

export const compileKeyValuePair = (
    key: string,
    value: string | number,
    indentationDepth: number,
    options?: { noQuotes?: boolean }
) => {
    let result = '';
    const quote = options?.noQuotes ? '' : '"';
    result += indent(indentationDepth);
    result += `${key}: ${value ? `${quote}${value}${quote}` : ''}\n`;
    return result;
};

export const indent = (indentationDepth: number) => {
    let indentationResult = '';
    for (let i = 0; i < indentationDepth; i++) {
        indentationResult += INDENTATION_CHARACTER;
    }
    return indentationResult;
};

export const compileObject = (obj: object, baseIndentationDepth: number) => {
    let result = '';
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'number') {
            result += `${indent(baseIndentationDepth)}${key}: ${value}\n`;
        } else if (Array.isArray(value)) {
            result += `${indent(baseIndentationDepth)}${key}: ${compileList(
                value,
                baseIndentationDepth + 1,
                {asSingleLineList: true}
            )}\n`;
        } else if (typeof value === 'string') {
            if (value.includes("\n")) {
                const lines = value.split("\n")
                lines.forEach((line, index) => {
                    if(index === 0) {
                        result += `${indent(baseIndentationDepth)}${key}: ${line}\n`;
                    } else {
                        result += `  ${indent(baseIndentationDepth)}${line}\n`;
                    }
                })
            } else {
                result += `${indent(baseIndentationDepth)}${key}: ${value}\n`;
            }
        } else {
            result += `${indent(baseIndentationDepth)}${key}: ${value}\n`;
        }
    });
    return result;
};

export const compileObjectListWithId = (
    list: { id: string }[],
    baseIndentationDepth: number
) => {
    let result = '';
    list.forEach(entry => {
        result += indent(baseIndentationDepth);
        result += `- ${entry.id}\n`;
    });
    return result;
};

export const compileList = (
    list: string[],
    baseIndentationDepth: number,
    options?: { asSingleLineList?: boolean }
) => {
    let result = '';

    if (options?.asSingleLineList) {
        result += '[';
        list.forEach((entry, index) => {
            result += `"${entry}"`;
            if (index < list.length - 1) {
                result += ', ';
            }
        });
        result += ']';
    } else {
        list.forEach(entry => {
            result += indent(baseIndentationDepth);
            result += `- ${entry}\n`;
        });
    }
    return result;
};

export const writeFile = (config: OutputFile) => {
    createDirIfNotExisting(config.outputDir);
    const resultFileName = `${config.outputDir}/${config.fileName}.yaml`;
    fs.writeFileSync(resultFileName, config.content);
};
