// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { App } from '@daimler/ftk-core';
import * as React from 'react';
import InterconnectionComponent from './interconnect/InterconnectionComponent';

const HotloadedComponent = () => (
  <App name="hotloaded">
    <InterconnectionComponent />
  </App>
);

export default () => (
  <App name="host">
    <div className="test-host">
      <InterconnectionComponent>
        <div className="test-hotloaded">
          <HotloadedComponent />
        </div>
      </InterconnectionComponent>
    </div>
  </App>
);
