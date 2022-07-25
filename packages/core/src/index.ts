// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

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
export { default as RouterProvider } from './router/component/RouterProvider';
export { default as Link } from './router/component/Link';
export { default as RouterService } from './router/lib/RouterService.type';
export { default as RouteConfig } from './router/lib/RouteConfig.type';
export { default as RouteParameter } from './router/lib/RouteParameter.type';
export { default as RouteQuery } from './router/lib/RouteQuery.type';
export { default as PathSerializeRouteInUrlStrategy } from './router/lib/serializeRouteInUrlStrategy/Path';
export { default as QueryStringSerializeRouteInUrlStrategy } from './router/lib/serializeRouteInUrlStrategy/QueryString';
export { default as HashbangSerializeRouteInUrlStrategy } from './router/lib/serializeRouteInUrlStrategy/Hashbang';

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
