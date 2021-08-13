// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH

import * as React from 'react';
import DeprecatedSwidgetLoader from './DeprecatedSwidgetLoader';
import WmfSwidgetLoader from './WmfSwidgetLoader';

export interface SwidgetLoaderProps {
  name?: string;
  errorFallback?: (error: Error) => React.ReactNode;
  loadingPlaceholder?: React.ReactNode;
  url?: string;
  scope?: string;
  module?: string;
  props?: object;
  uniqueId?: string;
  deprecated?: boolean;
}

const SwidgetLoader = (props: SwidgetLoaderProps) => {
  if (props.deprecated && props.deprecated === true) {
    return <DeprecatedSwidgetLoader
      {...props}
      url={props.url}
      name={props.name}
    />
  } else {
    return <WmfSwidgetLoader
      {...props}
      url={props.url}
      module={props.module}
      scope={props.scope}
    />
  }
}

export default SwidgetLoader;
