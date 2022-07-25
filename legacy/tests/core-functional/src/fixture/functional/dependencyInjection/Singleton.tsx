// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { BindToDi } from '@daimler/ftk-core';
import { singleton } from '@daimler/ftk-core/lib/privateapi';
import * as React from 'react';

const SingletonTestComponent: React.SFC<{}> = (props) => (
  <h1 className="singleton" style={{ color: 'green' }}>
    {props.children}
  </h1>
);

const Singleton = singleton('someRandomString', SingletonTestComponent);

export class SingletonTestComponentSetup extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <Singleton>ChildtextNode</Singleton>
        <BindToDi
          services={(container) => {
            container.bind('someRandomString');
          }}
        >
          <Singleton>ChildTextNode</Singleton>
          <Singleton>ChildTextNode</Singleton>
          <Singleton>ChildTextNode</Singleton>
          <Singleton>ChildTextNode</Singleton>
        </BindToDi>
      </>
    );
  }
}
