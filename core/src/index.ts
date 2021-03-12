// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

// core
export { default as kernel } from './core/kernel';
export { App } from './core/App';
export { default as serviceIds } from './core/serviceIds';

// Config
export { default as IConfigData } from './config/lib/interface/IConfigData';
export { ConfigService } from './config/lib/ConfigService';
export { ConfigProvider } from './config/component/Provider';

// ErrorHandler
export { ErrorHandler } from './errorHandler/lib/ErrorHandler';
export { default as IErrorHandlerStrategy } from './errorHandler/lib/interface/IErrorHandlerStrategy';

import { interfaces } from 'inversify';
export type IDiContainer = interfaces.Container;
export type IDiContext = interfaces.Context;
export { Container as DiContainer } from 'inversify';

// i18n
export { I18nService } from './i18n/lib/I18nService';
export { default as composeTranslations } from './i18n/hoc/composeTranslations';
export { default as ITranslationMap } from './i18n/lib/interface/ITranslationMap';
export { default as ITranslationMapItem } from './i18n/lib/interface/ITranslationMapItem';
export { default as ITranslation } from './i18n/lib/interface/ITranslation';
export { TranslationProvider } from './i18n/component/TranslationProvider';

// Router
export { default as Route } from './router/component/Route';
export { default as RouterProvider } from './router/component/RouterProvider';
export { default as IRouteConfig } from './router/component/interface/IRouteConfig';
export { RouterService } from './router/lib/RouterService';

// DI
export { default as BindToDi } from './di/component/BindToDi';
export { default as ChildContainer } from './di/component/ChildContainer';
export { default as withInject, IWithDiProps } from './di/hoc/withInject';
export { default as inject } from './di/hoc/inject';

// hotloading
export { default as SwidgetLoader } from './componentLoader/component/SwidgetLoader';
export { ISwidget, ISwidgetMetadata } from './componentLoader/ISwidget';
export { IAssetResolver } from './componentLoader/lib/assetResolver';
export { InterconnectionService } from './interconnection/InterconnectionService';
export { default as IEventData } from './interconnection/interface/IEventData';
export { default as singleton } from './di/hoc/singleton';

// Hooks bridge
export { useFromDi, useConfig, useDi, useErrorHandler, useInterconnection, useRouter, useI18n } from './util/Hooks';
