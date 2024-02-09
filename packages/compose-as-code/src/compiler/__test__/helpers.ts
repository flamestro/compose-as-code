import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';
import { createHash } from 'crypto';
import { compile } from '../compositionCompiler';
import { App } from '../../composition/app';

const promisifiedExec = promisify(exec);

async function hashDirectory(dirname) {
  try {
    let contentStr = '';
    const files = fs.readdirSync(dirname);

    files.forEach(filename => {
      const content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
      console.log(`${filename} + ${content.length}`);
      contentStr += filename + content;
    });
    return createHash('sha256').update(contentStr).digest('hex');
  } catch (e) {
    return '';
  }
}

export async function snapshot(
  app: App,
  outputDir: string,
  name: string,
  options?: { skipDockerCheck?: boolean }
) {
  const resultDir = `${outputDir}/${name}_snapshot`;
  const hashBefore = (await hashDirectory(resultDir)) || '';
  const files = await compile({
    outputDir: resultDir,
  });
  const hashAfter = await hashDirectory(resultDir);

  expect(hashAfter).toEqual(hashBefore);
  if (!options?.skipDockerCheck) {
    for (const file of files) {
      const result = await promisifiedExec(
        `docker compose -f ${resultDir}/${file.fileName}.yaml config`
      );
      expect(result.stderr).toEqual('');
    }
  }
}
