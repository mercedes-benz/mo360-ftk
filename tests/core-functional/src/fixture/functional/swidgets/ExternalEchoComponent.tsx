// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IDiContainer, ISwidget, serviceIds, App, withInject } from '@daimler/ftk-core';
import * as React from 'react';

export interface IProps {
  echo?: string;
  container: IDiContainer;
}

class ExternalEchoComponent extends React.Component<IProps, {}> {
  private get uniqueId() {
    // will only be bound if <SwidgetLoader /> is used to load a swidget
    if (this.props.container.isBound(serviceIds.currentSwidget.uniqueId)) {
      return this.props.container.get<string>(serviceIds.currentSwidget.uniqueId);
    } else {
      return '';
    }
  }

  public render() {
    return (
      <App name="ExternalEchoComponent">
        <div className="external-component-echo">{this.props.echo || ''}</div>;
        <div className="external-component-uniqueid">{this.uniqueId}</div>
      </App>
    );
  }
}

const SwidgetComponent = withInject(ExternalEchoComponent);

const swidget: ISwidget<IProps> = (props) => {
  return <SwidgetComponent {...props} />;
};

swidget.metadata = {
  authors: ['john.doe@example.com'],
  ftkCompatibleVersion: '1.0.0',
  version: '1.2.3',
};

export default swidget;
