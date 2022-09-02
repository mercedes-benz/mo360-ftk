// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import BindToDi from '../../di/component/BindToDi';
import serviceIds from '../../core/serviceIds';
import {getDefaultAssetResolver} from '../lib/assetResolver';

export interface WmfSwidgetLoaderProps {
  errorFallback?: (error: Error) => React.ReactNode;
  loadingPlaceholder?: React.ReactNode;
  url: string;
  scope: string;
  module: string;
  props?: object;
  uniqueId: string;
}

/** @see https://github.com/webpack/webpack/issues/11033 */
/** @see https://github.com/module-federation/module-federation-examples/blob/master/dynamic-system-host/app1/src/App.js */

const loadComponent = (scope: string, module: string) => {
  return async () => {
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__('default');
    const container: { init: Function; get: Function; } = (window as any)[scope];
    // eslint-disable-next-line @typescript-eslint/camelcase,no-undef
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  };
};

const useDynamicScript = (args: { url: string }) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

const WmfSwidgetLoader = (props: WmfSwidgetLoaderProps) => {
  const { ready, failed } = useDynamicScript({
    url: props.url,
  });

  if (!ready) {
    return <>{props.loadingPlaceholder || null}</>;
  } else if (failed) {
    if (typeof props.errorFallback === 'function') {
      return <>{props.errorFallback(null)}</>
    } else {
      return <>Error loading Swidget</>;
    }
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));
  const baseUrl = window.location.href;
  const url: URL = new URL(props.url, baseUrl) as any;

  return (
    <BindToDi
      services={(container) => {
        container.bind(serviceIds.currentSwidget.url).toConstantValue(url);
        container.bind(serviceIds.currentSwidget.assetResolver).toConstantValue(getDefaultAssetResolver(url));
        container.bind(serviceIds.currentSwidget.uniqueId).toConstantValue(props.uniqueId);
      }}
    >
      <React.Suspense fallback={ props.loadingPlaceholder || null }>
        <Component />
      </React.Suspense>
    </BindToDi>
  );
}

export default WmfSwidgetLoader;
