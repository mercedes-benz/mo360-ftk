// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { merge, once } from 'lodash';
import * as React from 'react';
import { IConfigData, IDiContainer, IDiContext } from '../..';
import BindToDi from '../../di/component/BindToDi';
import withInject from '../../di/hoc/withInject';
import { findBoundContainer } from '../../di/lib/findBoundContainer';
import { ConfigService } from '../lib/ConfigService';

const defaultConfig = Object.seal({
  core: {
    i18n: {
      defaultLocale: 'de',
    },
  },
  project: {},
  runtime: {},
});

export interface IConfigProviderProps {
  config?: IConfigData<any, any>;
}

class Provider extends React.Component<IConfigProviderProps> {
  private bindServices = once((container: IDiContainer) => {
    container.bind<ConfigService>(ConfigService).toDynamicValue((context: IDiContext) => {
      let config: IConfigData = defaultConfig;
      try {
        const boundContainer = findBoundContainer(context.container, ConfigService);
        // prevent a recursion loop if the configuration is bound in our own container
        if (boundContainer.id !== context.container.id) {
          config = boundContainer.get(ConfigService).getConfig();
        }
      } catch {
        // swallow the error; it means we have no config already bound and fallback to use the defaultConfig
      }

      const overwrittenConfig = this.props.config || {};
      const merged = merge({ ...config }, overwrittenConfig);

      return new ConfigService(merged);
    });
  });

  public render() {
    return <BindToDi services={this.bindServices}>{this.props.children}</BindToDi>;
  }
}

export const ConfigProvider = withInject(Provider);
