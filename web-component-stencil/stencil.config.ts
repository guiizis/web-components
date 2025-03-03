import { Config } from '@stencil/core';
import dotEnvPlugin  from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'web-component-stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    dotEnvPlugin(),
  ],
  testing: {
    browserHeadless: "shell",
  },
};
