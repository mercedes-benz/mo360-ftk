// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IConfigData } from '@daimler/ftk-core';
import ProjectConfig from '../src/globals/interfaces/ProjectConfig';

const config: IConfigData<ProjectConfig, {}> = {
  core: {
    i18n: {
      defaultLocale: 'en',
    },
  },
  project: {
    appName: '<My-App>',
  },
  runtime: {},
};

export default config;
