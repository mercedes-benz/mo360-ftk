// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { ChildContainer, IDiContainer } from '@daimler/ftk-core';
import { diContext } from '@daimler/ftk-core/lib/privateapi';
import { once } from 'lodash';
import * as React from 'react';

/**
 * Explicitly creates a new Container that inherits from its parent scope and
 * will be supplied to all child components.
 */
export class ContainerContextSetup extends React.Component<{}, {}> {
  private container1: IDiContainer;
  private container2: IDiContainer;
  private container3: IDiContainer;

  private test = once(() => {
    this.container1.bind<string>('container1').toConstantValue('container1');
    this.container1.bind<string>('container3').toConstantValue('container1');
    this.container3.bind<string>('container3').toConstantValue('container3');
    const ret = (
      <>
        <h1 className="alldifferent">{this.allContainersAreDifferent().toString()}</h1>
        <h1 className="parentaccess">{this.dependenciesAreResolvedFromParents().toString()}</h1>
        <h1 className="overwriteparent">{this.childContainersOverwriteParentDependencies().toString()}</h1>
      </>
    );
    return ret;
  });

  public render() {
    return (
      <diContext.Consumer>
        {(container1) => (
          <ChildContainer>
            <diContext.Consumer>
              {(container2) => (
                <ChildContainer>
                  <diContext.Consumer>
                    {(container3) => {
                      this.container1 = container1;
                      this.container2 = container2;
                      this.container3 = container3;
                      return this.test();
                    }}
                  </diContext.Consumer>
                </ChildContainer>
              )}
            </diContext.Consumer>
          </ChildContainer>
        )}
      </diContext.Consumer>
    );
  }

  private allContainersAreDifferent = () => {
    return this.container1 !== this.container2 && this.container2 !== this.container3;
  };

  private dependenciesAreResolvedFromParents = () => {
    return this.container3.get('container1') === 'container1';
  };

  private childContainersOverwriteParentDependencies = () => {
    return this.container3.get('container3') === 'container3';
  };
}
