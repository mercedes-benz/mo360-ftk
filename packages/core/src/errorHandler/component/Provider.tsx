// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import BindToDi from '../../di/component/BindToDi';
import { ErrorHandler } from '../lib/ErrorHandler';

export interface IState {
  error: string;
}

class Provider extends React.Component<{}, IState> {
  public state: IState = {
    error: undefined,
  };

  private errorHandler: ErrorHandler;

  private bindServices = once((container: IDiContainer) => {
    this.errorHandler = new ErrorHandler();

    container.bind<ErrorHandler>(ErrorHandler).toConstantValue({
      handleError: (message: string, stacktrace: string): void => {
        this.setState({
          error: `Error: ${message}`,
        });

        this.errorHandler.handleError(message, stacktrace);
      },
    });
  });

  public render() {
    return (
      <BindToDi services={this.bindServices}>
        {this.state.error ? <div className="error test-error">{this.state.error}</div> : this.props.children}
      </BindToDi>
    );
  }

  public componentDidCatch(error: Error): void {
    this.setState({
      error: `Error: ${error.message}`,
    });

    this.errorHandler.handleError(error.message, error.stack);
  }
}

export default Provider;
