// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { forEach, once } from 'lodash';
import * as React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { IDiContainer, IDiContext, ITranslationMap } from '../..';
import serviceIds from '../../core/serviceIds';
import BindToDi from '../../di/component/BindToDi';
import { IWithDiProps } from '../../di/hoc/withInject';
import Registry from '../../util/Registry';
import { I18nService } from '../lib/I18nService';
import ITranslation from '../lib/interface/ITranslation';
import TranslationMap from '../lib/TranslationMap';

export interface II18nProviderProps extends WrappedComponentProps {
  lang: string;
  setLang: (lang: string) => void;
}

function createTranslationRegistry(translationMap: ITranslationMap) {
  const registry = new Registry<ITranslation>();
  const translations = TranslationMap.convert(translationMap);
  forEach(translations, (translation) => {
    registry.add(translation.translationId, translation);
  });

  return registry;
}

export default class I18nProvider extends React.Component<II18nProviderProps & IWithDiProps, {}> {
  private bindService = once((container: IDiContainer) => {
    container.bind(I18nService).toDynamicValue((context: IDiContext) => {
      const getLang = () => this.props.lang;
      const setLang = this.props.setLang;
      const translationMap = context.container.get<ITranslationMap>(serviceIds.translations);
      const registry = createTranslationRegistry(translationMap);
      return new I18nService(registry, getLang, setLang, this.props.intl);
    });
  });

  public render() {
    return <BindToDi services={this.bindService}>{this.props.children}</BindToDi>;
  }
}
