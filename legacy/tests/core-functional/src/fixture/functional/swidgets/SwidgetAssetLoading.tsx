// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IAssetResolver, IDiContainer, inject, ISwidget, serviceIds, withInject } from '@daimler/ftk-core';
import * as React from 'react';

export interface IProps {
  container?: IDiContainer;
}

class AssetLoadingComponent extends React.Component<IProps, {}> {
  @inject(serviceIds.currentSwidget.assetResolver) private asset: IAssetResolver;

  public get currentSwidgetData() {
    return {
      uniqueId: this.props.container.get<string>(serviceIds.currentSwidget.uniqueId),
      url: this.props.container.get<string>(serviceIds.currentSwidget.url).toString(),
    };
  }

  public get assetData() {
    const parentPath = this.asset('../image.jpeg');
    const doubleParentPath = this.asset('../../image.jpeg');
    const differentOrigin = this.asset('http://example.com/nested/image.jpeg');
    const absolutePath = this.asset('/images/image.jpeg');
    const relativePath = this.asset('./image.jpeg');

    return {
      absolutePath,
      differentOrigin,
      doubleParentPath,
      parentPath,
      relativePath,
    };
  }

  public render() {
    return (
      <>
        <h1>{this.currentSwidgetData.uniqueId}</h1>
        <div className={this.currentSwidgetData.uniqueId}>
          <pre className="swidget-data">{JSON.stringify(this.currentSwidgetData, undefined, 2)}</pre>
          <pre className="asset-data">{JSON.stringify(this.assetData, undefined, 2)}</pre>
        </div>
      </>
    );
  }
}

export const AssetLoading = withInject(AssetLoadingComponent);

const swidget: ISwidget = () => {
  return <AssetLoading />;
};

swidget.metadata = {};

export default swidget;
