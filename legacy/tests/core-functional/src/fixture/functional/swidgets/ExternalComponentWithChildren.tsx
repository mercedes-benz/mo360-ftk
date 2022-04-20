// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { ISwidget } from '@daimler/ftk-core';
import * as React from 'react';

class ExternalComponentWithChildren extends React.Component<{}, {}> {
  public render() {
    return <div>{this.props.children}</div>;
  }
}

const swidget: ISwidget = (props) => {
  return <ExternalComponentWithChildren>{props.children}</ExternalComponentWithChildren>;
};
swidget.metadata = {};

export default swidget;
