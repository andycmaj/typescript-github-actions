import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { ExecOptions } from '@actions/exec/lib/interfaces';
import { getConfig } from '@typescript-github-actions-template/shared';

const checkForChanges = async (): Promise<boolean> => {
  let myOutput = '';

  const options: ExecOptions = {};
  options.listeners = {
    stdout: (data: Buffer): void => {
      myOutput += data.toString();
    },
  };
  options.cwd = '.';

  await exec('git', ['status', '-s'], options);

  return !!myOutput.trim();
};

async function run(): Promise<void> {
  const config = getConfig();

  core.debug(JSON.stringify(config));

  try {
    const hasChanges = await checkForChanges();

    core.info(hasChanges ? 'repo has changes' : 'no changes');
    core.setOutput('repoHasChanges', hasChanges.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
