# Example: Extended configs

If you have multiple configurations for your project and do not want to duplicate code you can reuse them easily.

```tsx
// Default configuration
import { IConfigData } from '@mercedes-benz/ftk-core';

interface ProjectConfig = {
    backendUrl: string;
    timeout: number;
}

const config: IConfigData<ProjectConfig, {}> = {
  core: {
    i18n: {
      defaultLocale: 'en',
    },
  },
  project: {
    backendUrl: 'http://localhost:3000',
    timeout: 1,
  },
  runtime: {},
};

export default config;

// extended configuration (production, integration, ...)
import { IConfigData } from '@mercedes-benz/ftk-core';
import defaultConfig from './default';

const config: IConfigData<ProjectConfig, {}> = {
  core: {
    ...defaultConfig.core,
  },
  project: {
    ...defaultConfig.project,
    backendUrl: 'https://realurl',
  },
  runtime: {},
};

export default config;
```
