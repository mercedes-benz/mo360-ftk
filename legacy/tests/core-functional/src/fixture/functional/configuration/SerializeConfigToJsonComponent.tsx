// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { ConfigService, inject, withInject } from '@daimler/ftk-core';
import * as React from 'react';

class SerializeConfigToJsonComponent extends React.Component<{}, {}> {
  @inject() private configuration: ConfigService;

  public render() {
    return <div className="config-json">{JSON.stringify(this.configuration.getConfig())}</div>;
  }
}

export default withInject(SerializeConfigToJsonComponent);
