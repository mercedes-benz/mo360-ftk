// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import withInject from '../../di/hoc/withInject';
import { TranslationProvider } from '../component/TranslationProvider';
import ITranslationMap from '../lib/interface/ITranslationMap';

/**
 * Will bind a translation map to a component AND its children. That is, if you component
 * has children, they will have access to the translations in the given translation map.
 *
 * Note: This is just a shorthand for using the <TranslationProvider>.
 */
export default function composeTranslations<TProps>(
  WrappedComponent: React.ComponentType<TProps>,
  translationMap: ITranslationMap,
): React.ComponentType<TProps> {
  const Component = withInject(WrappedComponent);
  class I18nComponent extends React.Component<TProps, {}> {
    public render() {
      return (
        <TranslationProvider translations={translationMap}>
          <Component {...this.props} />
        </TranslationProvider>
      );
    }
  }

  return I18nComponent;
}
