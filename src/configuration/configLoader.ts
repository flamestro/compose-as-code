import fs from "fs";

interface CacConfiguration {
    entrypoint: string,
    outputDir: string
}

export const loadConfiguration = () => {

    const configurationStr = fs.readFileSync('./cac.config.json', {encoding: 'utf-8'})
    const configuration: CacConfiguration = JSON.parse(configurationStr);

    if(!configuration.entrypoint && !(typeof configuration.entrypoint === 'string')){
        throw new Error("Your configuration has an invalid entrypoint")
    }
    if(configuration.outputDir &&!(typeof configuration.outputDir === 'string')){
        throw new Error("Your configuration has an invalid type for outputDir")
    }

    configuration.outputDir = configuration.outputDir ?? './out';

    return configuration;
}