// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import { render } from 'react-dom';
import { default as ComponentLoader } from './ComponentLoader';
import { default as ComponentLoaderWithChildren } from './ComponentLoaderWithChildren';
import { default as ComposeTranslations } from './ComposeTranslations';
import { default as Configuration } from './Configuration';
import { default as DependencyInjection } from './DependencyInjection';
import { default as ErrorHandler } from './ErrorHandler';
import { default as Hooks } from './Hooks';
import { default as Interconnect } from './Interconnect';
import { default as Router } from './Router';

/**
 * All test components are made available at http://componentname.localtest.me:8080
 * You can view a list of all available test components at http://index.localtest.me:8080
 */
const testComponents: { [key: string]: React.ComponentType<{}> } = {
  ComponentLoader,
  ComponentLoaderWithChildren,
  ComposeTranslations,
  Configuration,
  DependencyInjection,
  ErrorHandler,
  Hooks,
  Interconnect,
  Router,
};

function Index() {
  return (
    <div>
      <h1>Index of available components to test</h1>
      <p>
        <ul>
          {Object.keys(testComponents).map((componentName) => {
            const url = `http://${componentName.toLocaleLowerCase()}.localtest.me:8080/`;
            return (
              <li key={componentName}>
                {componentName}{' '}
                <a href={url} target="_blank" rel="noreferrer noopener">
                  {url}
                </a>
              </li>
            );
          })}
        </ul>
      </p>
    </div>
  );
}

interface IProps {
  testComponentName: string;
}

class TestHost extends React.Component<IProps, {}> {
  public render() {
    if (!this.props.testComponentName || this.props.testComponentName === '/') {
      return <h1>No test component specified {this.props.testComponentName}</h1>;
    }
    let TestComponent: React.ComponentType;
    Object.keys(testComponents).map((name) => {
      if (name.toLocaleLowerCase() === this.props.testComponentName) {
        TestComponent = testComponents[name];
      }
    });
    // const TestComponent = OtestComponents[this.props.testComponentName];
    if (!TestComponent) {
      if (this.props.testComponentName === 'index') {
        return <Index />;
      }
      throw new Error('No test component found for name: ' + this.props.testComponentName);
    }
    return <TestComponent />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hostname = window.location.hostname;
  if (hostname.indexOf('localtest.me') === -1) {
    const msg =
      'Please do not use localhost/127.0.0.1 but rather COMPONENTNAME.localtest.me - or see index.localtest.me for a list of available test components';
    throw new Error(msg);
  }
  let testComponentName = hostname.split('.')[0];
  if (!testComponentName || testComponentName === 'localtest') {
    testComponentName = 'index';
  }
  render(React.createElement(TestHost, { testComponentName }, null), document.getElementById('root'));
});
