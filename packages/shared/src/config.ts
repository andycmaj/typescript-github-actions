import * as core from '@actions/core';

export interface Config {
  environment: string;
}

export const getConfig = (): Config => {
  const environment = core.getInput('environment');
  const config: Config = {
    environment,
  };

  return config;
};
