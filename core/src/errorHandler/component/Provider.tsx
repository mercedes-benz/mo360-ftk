// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import BindToDi from '../../di/component/BindToDi';
import { ErrorHandler } from '../lib/ErrorHandler';
import withInject from '../../di/hoc/withInject';
import inject from '../../di/hoc/inject';
import serviceIds from '../../core/serviceIds';
import IErrorHandlerStrategy from '../lib/interface/IErrorHandlerStrategy';

export interface IState {
  error: string;
}

class Provider extends React.Component<{}, IState> {
  public state: IState = {
    error: undefined,
  };

  @inject(serviceIds.errorHandlerStrategy) private errorHandlerStrategy: IErrorHandlerStrategy;

  private bindServices = once((container: IDiContainer) => {
    container.bind<ErrorHandler>(ErrorHandler).toConstantValue(
      new ErrorHandler({
        handleError: this.handleError
      })
    )
  });

  public render() {
    return (
      <BindToDi services={this.bindServices}>
        {this.state.error ? <div className="error test-error">{this.state.error}</div> : this.props.children}
      </BindToDi>
    );
  }

  public componentDidCatch(error: Error): void {
    this.handleError(error.message, error.stack)
  }

  protected handleError(message: string, stacktrace: string): void {
    this.setState({
      error: `Error: ${message}`,
    });

    this.errorHandlerStrategy.handleError(message, stacktrace);
  }
}

export default withInject(Provider);
