import { ExecutorContext } from '@nrwl/devkit';
import { getProjectConfiguration } from '@ns3/nx-core';
import { PublishExecutorNormalizedSchema, PublishExecutorSchema } from '../schema';

export function normalizeOptions(
  options: PublishExecutorSchema,
  context: ExecutorContext,
): PublishExecutorNormalizedSchema {
  const npmScope = context.workspace?.npmScope;

  if (!npmScope) {
    throw new Error('Missing npmScope in workspace');
  }

  return {
    ...options,
    npmToken: getNpmToken(options),
    pkgLocation: getPkgLocation(options, context),
    npmScope: npmScope,
    pkgVersion: options.pkgVersion || process.env['NPM_PACKAGE_VERSION'],
    tag: options.tag || process.env['NPM_PACKAGE_TAG'] || 'latest',
  };
}

function getPkgLocation(options: PublishExecutorSchema, context: ExecutorContext): string {
  const config = getProjectConfiguration(context);

  if ('build' in config.targets && 'outputPath' in config.targets.build.options) {
    return config.targets.build.options.outputPath as string;
  }

  throw new Error('Project is missing build target with outputPath.');
}

function getNpmToken(options: PublishExecutorSchema): string {
  const token = options.npmToken || process.env.NPM_TOKEN;

  if (!token) {
    throw new Error('npmToken was not provided as an arg nor is it present in env.');
  }

  return token;
}
