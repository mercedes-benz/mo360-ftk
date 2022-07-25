// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { inject, InterconnectionService, withInject } from '@daimler/ftk-core';
import { once } from 'lodash';
import * as React from 'react';

export interface IState {
  events: Array<{
    data: string;
    publisherName: string;
    isPublisherHotLoaded: boolean;
  }>;
}

class InterconnectionComponent extends React.Component<{}, IState> {
  public state: IState = {
    events: [],
  };

  public subscribe = once(() => {
    this.interconnection.subscribe<string>('foo', (data) => {
      this.setState({
        events: this.state.events.concat([data]),
      });
    });
  });

  @inject() private interconnection: InterconnectionService;

  public render() {
    this.subscribe();
    return (
      <div>
        <button className="test-button" onClick={this.handleClick.bind(this)}>
          publish
        </button>
        <div className="test-events">
          {this.state.events.map((event, index) => {
            return <span key={index}>{JSON.stringify(event)}</span>;
          })}
        </div>
        {this.props.children}
      </div>
    );
  }

  protected handleClick() {
    this.interconnection.publish<string>('foo', 'bar');
  }
}

export default withInject(InterconnectionComponent);
