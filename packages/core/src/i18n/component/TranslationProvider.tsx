// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import { ConfigService } from '../../config/lib/ConfigService';
import serviceIds from '../../core/serviceIds';
import BindToDi from '../../di/component/BindToDi';
import inject from '../../di/hoc/inject';
import withInject from '../../di/hoc/withInject';
import ITranslationMap from '../lib/interface/ITranslationMap';
import TranslationMap from '../lib/TranslationMap';
import { PropsWithChildren } from 'react';

/**
 * Deep-merges translation map trees together. The operation is immutable (neither input arg is mutated).
 * Lodash's merge() function is used for deep-merging.
 * The logic is:
 *   * Child translations overwrite parent translations (deep merge)
 *   * any overrides specific in the configuration (via see ConfigService, @see {ConfigService} ) is
 *     applied after the merge; that is configuration overrides are applied last and override any child
 *     translation.
 */
function mergeTranslations(parent: ITranslationMap, child: ITranslationMap, configTranslations: ITranslationMap) {
  const merged = TranslationMap.merge(parent, child);
  return TranslationMap.merge(merged, configTranslations);
}

/**
 * Looks up in the global app/swidget configuration if any translation overrides are defined an return them,
 * or an empty map if none are found.
 */
function getConfigTranslationMap(configService: ConfigService) {
  let config: ITranslationMap;
  try {
    config = configService.getConfig().core.i18n.map || {};
  } catch (e) {
    config = {};
  }
  return config;
}

interface ITranslationProviderProps {
  translations: ITranslationMap;
}

/**
 * Allows to extend the current translations map. Note that the provided translations
 * are only made available to child components of the TranslationProvider, and will not affect
 * any global translations or similar.
 *
 * @example
 * <TranslationProvider translations={{de:{HELLOWORLD: 'Hallo welt!'}}}>
 *   <HelloWorldComponent />
 * </TranslationProvider>
 */
class Provider extends React.Component<ITranslationProviderProps & PropsWithChildren> {
  @inject() public configService: ConfigService;

  public setupTranslations = once((container: IDiContainer) => {
    const parentTranslations = container.get<ITranslationMap>(serviceIds.translations);
    const newTranslations = this.props.translations;
    const configTranslations = getConfigTranslationMap(this.configService);

    const mergedTranslations = mergeTranslations(parentTranslations, newTranslations, configTranslations);
    container.bind<ITranslationMap>(serviceIds.translations).toConstantValue(mergedTranslations);
  });

  public render() {
    return <BindToDi services={this.setupTranslations}>{this.props.children}</BindToDi>;
  }
}

export const TranslationProvider = withInject(Provider);
