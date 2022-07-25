// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import ChildContainer from '../component/ChildContainer';
import { diContext } from '../lib/diContext';

export interface IProps {
  services: (container: IDiContainer) => void;
}

class BindToDi extends React.Component<IProps, {}> {
  private registerServices = once((container: IDiContainer) => {
    this.props.services(container);
  });

  public render() {
    return (
      <ChildContainer>
        <diContext.Consumer>
          {(container) => {
            this.registerServices(container);
            return this.props.children;
          }}
        </diContext.Consumer>
      </ChildContainer>
    );
  }
}

export default BindToDi;
