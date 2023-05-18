import {Composition} from "../composition/composition";
import {target} from "../index";
import {compileKeyValuePair, writeFile} from "./compilerUtils";
import {compileServices} from "./serviceCompiler";
import {compileNetworks} from "./networkCompiler";

interface CompilerProps {
    outputDir?: string,
}

const compileCompositionMetaData = (composition: Composition) => {
    const baseIndentation = 0
    let result = ''
    result += compileKeyValuePair('version', composition.version, baseIndentation)
    result += compileKeyValuePair('name', composition.name.toLowerCase(), baseIndentation)
    return result
}

export const compile = (compilerProps?: CompilerProps) => {
    target.compositions.forEach(
        composition => {
            let resultFileContent = ''
            resultFileContent += compileCompositionMetaData(composition)
            if(composition.services && composition.services.length > 0){
                resultFileContent += compileServices(composition)
            }
            if(composition.networks && composition.networks.length > 0) {
                resultFileContent += compileNetworks(composition)
            }
            writeFile({
                fileName: composition.id,
                outputDir: compilerProps.outputDir ?? './out',
                content: resultFileContent
            })
        }
    )
}
