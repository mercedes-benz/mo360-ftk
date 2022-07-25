// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';

class BrokenComponent extends React.Component<{}, {}> {
  /* eslint-disable react/require-render-return */
  public render(): never {
    throw new Error('Broken Component!');
  }
  /* eslint-enable react/require-render-return */
}

export default BrokenComponent;
