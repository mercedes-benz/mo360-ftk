// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { SwidgetLoader } from '@daimler/ftk-core';
import * as React from 'react';
import { AssetLoading } from '../swidgets/SwidgetAssetLoading';

class AssetResolverTest extends React.Component<{}> {
  public render() {
    const url1 = 'http://swidgets.localtest.me:8081/SwidgetAssetLoading.js';
    const url2 = 'http://swidgets.localtest.me:8081/somewhere/SwidgetAssetLoading.js';
    const url3 = 'http://swidgets.localtest.me:8081/somewhere/deep/SwidgetAssetLoading.js';

    return (
      <>
        <AssetLoading />
        <SwidgetLoader uniqueId="swidget1" url={url1} name={'SwidgetAssetLoading'} />
        <SwidgetLoader uniqueId="swidget2" url={url2} name={'SwidgetAssetLoading'} />
        <SwidgetLoader uniqueId="swidget3" url={url3} name={'SwidgetAssetLoading'} />
      </>
    );
  }
}

export default AssetResolverTest;
