import { Composition } from '../composition/composition';
import { compileKeyValuePair, OutputFile, writeFile } from './compilerUtils';
import { compileServices } from './serviceCompiler';
import { compileNetworks } from './networkCompiler';
import { compileVolumes } from './volumeCompiler';

interface CompilerProps {
  outputDir: string;
}

const compileCompositionMetaData = (composition: Composition) => {
  const baseIndentation = 0;
  let result = '';
  result += compileKeyValuePair(
    'version',
    composition.version,
    baseIndentation
  );
  result += compileKeyValuePair(
    'name',
    composition.name.toLowerCase(),
    baseIndentation
  );
  return result;
};

export const compile = async (compilerProps: CompilerProps) => {
  const app = globalThis.cacStore.app;
  if (!app) {
    console.error(
      'No app was defined. Without an app there is no composition possible.'
    );
    return Promise.reject();
  }
  console.log(`Found ${app.compositions.length} compositions`);
  const resultingFiles: OutputFile[] = [];
  for (const composition of app.compositions) {
    let resultFileContent = '';
    resultFileContent += compileCompositionMetaData(composition);
    if (composition.services && composition.services.length > 0) {
      resultFileContent += compileServices(composition);
    }
    if (composition.networks && composition.networks.length > 0) {
      resultFileContent += compileNetworks(composition);
    }
    if (composition.volumes && composition.volumes.length > 0) {
      resultFileContent += compileVolumes(composition);
    }
    resultingFiles.push({
      fileName: composition.id,
      outputDir: compilerProps.outputDir,
      content: resultFileContent,
    });
  }
  resultingFiles.forEach(file => writeFile(file));
  globalThis.cacStore.app = undefined
  return Promise.resolve(resultingFiles);
};

export const listContainers = async (): Promise<
  { composition: Composition; containerNames: string[] }[]
> => {
  const app = globalThis.cacStore.app;
  if (!app) {
    console.error(
      'No app was defined. Without an app there is no composition possible.'
    );
    return Promise.reject();
  }
  console.log(`Found ${app.compositions.length} compositions`);
  const containerNames: {
    composition: Composition;
    containerNames: string[];
  }[] = [];
  for (const composition of app.compositions) {
    containerNames.push({
      composition,
      containerNames: composition.services.map(
        service =>
          service.containerName || `${composition.name}-${service.id}-1`
      ),
    });
  }
  return Promise.resolve(containerNames);
};
